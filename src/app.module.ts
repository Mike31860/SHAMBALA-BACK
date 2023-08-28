import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';
import { UseCasesProxyModule } from '@infrastructure/use-cases-proxy/use-cases-proxy.module';
import { ControllersModule } from '@infrastructure/controllers/controllers.module';
import { PreAuthMiddleware } from '@infrastructure/middlewares/preauth-middleware/preauth-middleware.middleware';

@Module({
  imports: [
    EnvironmentConfigModule,
    UseCasesProxyModule.register(),
    ControllersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreAuthMiddleware).exclude('auth').forRoutes('*');
  }
}
