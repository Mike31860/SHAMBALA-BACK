import { IsAuthUserUseCase } from '@domain/use-cases/auth/models';
import { AUTH_USE_CASES } from '@infrastructure/use-cases-proxy/auth-use-cases-proxy';
import { UseCaseProxy } from '@infrastructure/use-cases-proxy/use-cases.provider';
import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(AUTH_USE_CASES.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUserUseCase: UseCaseProxy<IsAuthUserUseCase>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      try {
        await this.isAuthUserUseCase
          .getInstance()
          .execute(token.replace('Bearer ', ''));
        next();
      } catch (error) {
        PreAuthMiddleware.accessDenied(req.url, res);
      }
    } else {
      PreAuthMiddleware.accessDenied(req.url, res);
    }
  }

  private static accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'access denied',
    });
  }
}
