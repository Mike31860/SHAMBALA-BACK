import { ServiceAccount } from 'firebase-admin';

export interface AppConfigurations {
  getAppPort(): number;
  getAppContextPath(): string;
  getFirebaseServiceAccountPath(): ServiceAccount;
}
