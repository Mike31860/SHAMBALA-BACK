import { Module } from '@nestjs/common';
import { FirebaseApp } from './firebase-app/firebase-app';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [FirebaseApp],
  exports: [FirebaseApp],
})
export class FirebaseModule {}
