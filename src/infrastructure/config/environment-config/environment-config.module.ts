import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { ConfigModule } from '@nestjs/config';
import deployConfiguration from './deploy-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [deployConfiguration],
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
