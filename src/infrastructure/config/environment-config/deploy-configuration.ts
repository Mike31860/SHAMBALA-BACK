import { existsSync, readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = '.env.local.yaml';

export interface Configurations {
  app: {
    port: number;
    'context-path': string;
  };
  db: {
    user: string;
    password: string;
    host: string;
    name: string;
    port?: number;
    schema?: string;
    sync: boolean;
  };
  firebase: {
    project_id: string;
    private_key: string;
    client_email: string;
  };
}
export const configurations = (): Partial<Configurations> => {
  const prodEnv = process.env.ENV;
  console.log('ENVVV ', prodEnv);
  if (prodEnv == 'prod' || !existsSync(join(YAML_CONFIG_FILENAME))) {
    const configurations: Partial<Configurations> = {
      app: {
        'context-path': process.env.APP_CONTEXT_PATH,
        port: parseInt(process.env.PORT ?? '3000'),
      },
      db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        sync: new Boolean(process.env.DB_SYNC).valueOf(),
        user: process.env.DB_USER,
      },
      firebase: {
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
      },
    };
    return configurations;
  }
  return yaml.load(
    readFileSync(join(YAML_CONFIG_FILENAME), 'utf8'),
  ) as Configurations;
};
