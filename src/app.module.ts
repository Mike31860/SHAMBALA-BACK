import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { UseCasesProxyModule } from '@infrastructure/use-cases-proxy/use-cases-proxy.module';
import { ControllersModule } from '@infrastructure/controllers/controllers.module';
import { PreAuthMiddleware } from '@infrastructure/middlewares/preauth-middleware/preauth-middleware.middleware';
import { GetUserInterceptor } from '@infrastructure/middlewares/auth.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AUTH_USE_CASES } from '@infrastructure/use-cases-proxy/auth-use-cases-proxy';
import { IsAppAuthUserUseCase } from '@domain/use-cases/auth';
import { UseCaseProxy } from '@infrastructure/use-cases-proxy/use-cases.provider';
import { ConfigModule } from '@nestjs/config';
import { configurations } from '@infrastructure/config/environment-config/deploy-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    EnvironmentConfigModule,
    UseCasesProxyModule.register(),
    ControllersModule,
  ],
  providers: [
    {
      inject: [AUTH_USE_CASES.IS_AUTHENTICATED_USECASES_PROXY],
      provide: APP_INTERCEPTOR,
      useFactory: (useCaseProxy: UseCaseProxy<IsAppAuthUserUseCase>) =>
        new GetUserInterceptor(useCaseProxy),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreAuthMiddleware).exclude('auth').forRoutes('*');
  }
}
