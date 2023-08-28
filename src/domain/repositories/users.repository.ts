import { User, UserId } from '@domain/models/user.model';

export interface UsersRepository {
  insert(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: UserId): Promise<User>;
  update(id: UserId, user: User): Promise<User>;
  deleteById(id: UserId): Promise<void>;
}

export const UsersRepository = Symbol('UsersRepository');
