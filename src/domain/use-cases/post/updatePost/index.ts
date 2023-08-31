import { Post } from '@domain/models/post.model';
import { UpdatePost } from './model';
import { PostsRepository } from '@domain/repositories/post.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UpdatePostUseCase implements UpdatePost {
  constructor(
    @Inject()
    private readonly postRepository: PostsRepository,
  ) {}
  async execute(post: Post): Promise<void> {
    await this.postRepository.updatePost(post);
  }
}
