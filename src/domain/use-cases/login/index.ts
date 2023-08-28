import { User } from '@domain/models/user.model';
import { LoginCredentials } from './models';

export interface LoginUseCase {
  execute(loginCredentials: LoginCredentials): Promise<User>;
}
