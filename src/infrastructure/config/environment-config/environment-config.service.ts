import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '@domain/repositories/db-config-models';
import { AppConfigurations } from './models';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, AppConfigurations
{
  constructor(private configService: ConfigService) {}
  getDbParams(): string {
    return this.configService.get<string>('db.params');
  }

  getFirebaseServiceAccountPath(): ServiceAccount {
    const serviceAccount: ServiceAccount = {
      projectId: this.configService.get('firebase.project_id'),
      clientEmail: this.configService.get('firebase.client_email'),
      privateKey: this.configService
        .get('firebase.private_key')
        .replace(/\\n/gm, '\n'),
    };

    return serviceAccount;
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
