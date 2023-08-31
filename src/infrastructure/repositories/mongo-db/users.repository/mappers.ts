import { User } from '@domain/models/user.model';
import { User as DBUser } from '@infrastructure/models/mongo-db/user.schema';

export const mapDomainUser = (user: User): DBUser => {
  return {
    username: user.username,
    accessToken: user.accessToken,
    userImage: user.userImage,
    password: user.password,
  };
};

export const mapModelUser = (user: DBUser): User => {
  return {
    username: user.username,
    userImage: user.userImage,
    password: user.password,
    accessToken: user.accessToken,
  };
};
