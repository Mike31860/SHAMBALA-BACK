import { User } from '@domain/models/user.model';
import { UsersRepository } from '@domain/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User as DBUser } from '@infrastructure/models/mongo-db/user.schema';
import { Model } from 'mongoose';
import { mapDomainUser, mapModelUser } from './mappers';

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  constructor(@InjectModel(DBUser.name) private userModel: Model<DBUser>) {}

  async insert(user: User): Promise<void> {
    const createdUser = new this.userModel(mapDomainUser(user));
    await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    const users: DBUser[] = await this.userModel.find().exec();
    return users.map(mapModelUser);
  }

  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: string, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
