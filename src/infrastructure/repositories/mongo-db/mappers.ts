import { User } from '@domain/models/user.model';
import { User as DBUser } from '@infrastructure/models/mongo-db/user.schema';

export const mapDomainUser = (user: User): DBUser => {
  return {
    username: user.username,
    accessToken: user.accessToken,
    password: user.password,
  };
};

export const mapModelUser = (user: DBUser): User => {
  return {
    username: user.username,
    password: user.password,
    accessToken: user.accessToken,
  };
};
