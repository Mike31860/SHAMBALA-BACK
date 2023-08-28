import { MongooseDbConfigModule } from '@infrastructure/config/mongoose-db-config/mongoose-db-config.module';
import { User, UserSchema } from '@infrastructure/models/mongo-db/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoUsersRepository } from './users.repository';

@Module({
  imports: [
    MongooseDbConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [MongoUsersRepository],
  exports: [MongoUsersRepository],
})
export class MongoDbRepositoriesModule {}
