import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '@infrastructure/use-cases-proxy/use-cases-proxy.module';
import { PostsController } from './posts/posts.controller';
import { CommentsController } from './comments/comments.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [PostsController, CommentsController],
})
export class ControllersModule {}
