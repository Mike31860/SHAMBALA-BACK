import { AppError } from '@domain/exceptions/models';
import { User } from '@domain/models/user.model';

export class InvalidCredentials extends AppError {
  constructor(private readonly user: Omit<User, 'password'>) {
    super(`Invalid credentials for ${user.username}`);
  }

  getCredentials(): Partial<User> {
    return this.user;
  }
}
