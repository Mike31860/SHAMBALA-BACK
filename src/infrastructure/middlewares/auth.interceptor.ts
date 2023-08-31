import { IsAuthUserUseCase } from '@domain/use-cases/auth/models';
import { UseCaseProxy } from '@infrastructure/use-cases-proxy/use-cases.provider';
import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';

@Injectable()
export class GetUserInterceptor implements NestInterceptor {
  constructor(private readonly authService: UseCaseProxy<IsAuthUserUseCase>) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (token != null && token != '') {
      const userId = await this.authService
        .getInstance()
        .execute(token.replace('Bearer ', ''));
      req.user = userId;
    }
    return next.handle();
  }
}
