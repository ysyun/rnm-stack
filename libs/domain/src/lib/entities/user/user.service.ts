import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository, Transaction, TransactionRepository } from 'typeorm';

import { bcryptCompare, bcryptHash, NullPointerException } from '@rnm/shared';
import { User } from '@rnm/model';

import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>
  ) { }

  /**
   * Transaction Case 1
   * User getConnection, queryRunner
   */
  async create(data: User): Promise<User | undefined> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    data.password = await bcryptHash(data.password as string);

    await queryRunner.startTransaction();
    let savedUser;
    try {
      const savingUser = this.repository.create(data);
      savedUser = await queryRunner.manager.save(savingUser);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return
    } finally {
      await queryRunner.release();
    }
    return savedUser;
  }

  /**
   * Transaction Case 2
   * User getManager, queryRunner
   */
  async updateOne(id: number, data: User): Promise<any> {
    const manager = getManager();
    const connection = manager.connection;
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();
    let updatedUser;
    try {
      const { email, firstName, lastName, role } = data;
      updatedUser = await manager.update(UserEntity, id, { email, firstName, lastName, role });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return
    } finally {
      await queryRunner.release();
    }
    return updatedUser;
  }

  /**
   * Transaction Case 3
   * Use Transaction Decorator, TransactionRepository
   */
  @Transaction()
  async deleteOne(id: string, @TransactionRepository(UserEntity) entityRepository?: Repository<UserEntity>): Promise<any> {
    if (!entityRepository) {
      return new NullPointerException('There is no transaction respository.');
    }
    return entityRepository.delete(id);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async setCurrentRefreshToken(refreshToken: string, id: number) {
    const currentHashedRefreshToken = await await bcryptHash(refreshToken);
    await this.repository.update(id, {
      currentHashedRefreshToken
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number): Promise<User | undefined> {
    const user = await this.findOneById(id);

    const isRefreshTokenMatching = await bcryptCompare(
      refreshToken,
      user.currentHashedRefreshToken as string
    );

    if (isRefreshTokenMatching) {
      return user;
    }
    return;
  }

  async removeRefreshToken(id: number) {
    return this.repository.update(id, {
      currentHashedRefreshToken: undefined
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = this.repository.findOne({
      where: { username }
    });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.repository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

}
