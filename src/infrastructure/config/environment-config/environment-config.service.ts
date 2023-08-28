import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '@domain/repositories/db-config-models';
import { AppConfigurations } from './models';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, AppConfigurations
{
  constructor(private configService: ConfigService) {}

  getFirebaseServiceAccountPath(): string {
    return this.configService.get('firebase.serviceAccount');
  }

  getAppPort(): number {
    return this.configService.get('app.port') ?? 3000;
  }
  getAppContextPath(): string {
    return this.configService.get('app.context-path') ?? '';
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('db.host');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('db.port');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('db.user');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('db.password');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('db.name');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('db.schema');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('db.sync');
  }
}
