import { AuthToken, User } from '@domain/models/user.model';

export interface IsAuthUserUseCase {
  execute(accessToken: AuthToken): Promise<User>;
}
