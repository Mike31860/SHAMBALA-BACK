import { AuthToken, User } from '@domain/models/user.model';

export interface AuthRepository {
  verifyToken(accessToken: AuthToken): Promise<User>;
}
