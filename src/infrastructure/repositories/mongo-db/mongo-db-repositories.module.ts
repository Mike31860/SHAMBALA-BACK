import { MongooseDbConfigModule } from '@infrastructure/config/mongoose-db-config/mongoose-db-config.module';
import { User, UserSchema } from '@infrastructure/models/mongo-db/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoUsersRepository } from './users.repository';
import { MongoPostsRepository } from './posts.repository';
import { Post, PostSchema } from '@infrastructure/models/mongo-db/post.schema';

@Module({
  imports: [
    MongooseDbConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  providers: [MongoUsersRepository, MongoPostsRepository],
  exports: [MongoUsersRepository, MongoPostsRepository],
})
export class MongoDbRepositoriesModule {}
