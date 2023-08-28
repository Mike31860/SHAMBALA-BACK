import { AuthToken, UserId } from '@domain/models/user.model';

export interface IsAuthUserUseCase {
  execute(accessToken: AuthToken): Promise<UserId>;
}
