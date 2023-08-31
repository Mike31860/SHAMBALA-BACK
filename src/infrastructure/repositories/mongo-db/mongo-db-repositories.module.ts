import { MongooseDbConfigModule } from '@infrastructure/config/mongoose-db-config/mongoose-db-config.module';
import { User, UserSchema } from '@infrastructure/models/mongo-db/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoUsersRepository } from './users.repository';
import { MongoPostsRepository } from './posts.repository';
import { Post, PostSchema } from '@infrastructure/models/mongo-db/post.schema';
import {
  Comment,
  CommentSchema,
} from '@infrastructure/models/mongo-db/comment.schema';
import { MongoCommentRepository } from './comment.repository';

@Module({
  imports: [
    MongooseDbConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  providers: [
    MongoUsersRepository,
    MongoPostsRepository,
    MongoCommentRepository,
  ],
  exports: [MongoUsersRepository, MongoPostsRepository, MongoCommentRepository],
})
export class MongoDbRepositoriesModule {}
