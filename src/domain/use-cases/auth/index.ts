import { AuthToken, User } from '@domain/models/user.model';
import { AuthRepository } from '@domain/repositories/auth.repository';
import { IsAuthUserUseCase } from '@domain/use-cases/auth/models';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class IsAppAuthUserUseCase implements IsAuthUserUseCase {
  constructor(@Inject() private readonly authRepository: AuthRepository) {}

  async execute(accessToken: AuthToken): Promise<User> {
    return await this.authRepository.verifyToken(accessToken);
  }
}
