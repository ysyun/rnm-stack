import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NullPointerException } from '@rnm/shared';
import { getConnection, getManager, Repository, Transaction, TransactionRepository } from 'typeorm';

import { bcryptHash } from '../../utilties/bcrypt.util';
import { UserEntity } from './user.entity';
import { User } from './user.model';

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

    data.password = await bcryptHash(data.password);

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
      return new NullPointerException('There is no transaction respository of user-entity.');
    }
    return entityRepository.delete(id);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(username: string): Promise<User | undefined> {
    return this.repository.findOne({ username });
  }

}
