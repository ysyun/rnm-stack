import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { bcryptHash } from '../../utilties/bcrypt.util';
import { UserEntity } from './user.entity';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>
  ) { }

  async create(data: User): Promise<User> {
    data.password = await bcryptHash(data.password);
    return this.repository.save(data);
  }

  updateOne(id: number, data: User): Promise<any> {
    return this.repository.update(id, data);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(username: string): Promise<User | undefined> {
    return this.repository.findOne({ username });
  }

  deleteOne(id: string): Promise<any> {
    return this.repository.delete(id);
  }
}
