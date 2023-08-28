import { AppError } from '@domain/exceptions/models';
import { AuthToken } from '@domain/models/user.model';

export class InvalidToken extends AppError {
  constructor(private readonly token: AuthToken) {
    super(`Token invalid: ${token}`);
  }
}
