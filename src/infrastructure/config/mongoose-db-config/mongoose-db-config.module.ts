import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { MongooseModuleOptions, MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

export const getMongooseModuleOptions = (
  config: EnvironmentConfigService,
): MongooseModuleOptions => {
  const dbName = config.getDatabaseName();
  const password = config.getDatabasePassword();
  const user = config.getDatabaseUser();
  const uri = `${config.getDatabaseHost()}://${user}:${password}/${dbName}`;

  console.log(uri);
  return {
    uri,
  } as MongooseModuleOptions;
};

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getMongooseModuleOptions,
    }),
  ],
})
export class MongooseDbConfigModule {}
