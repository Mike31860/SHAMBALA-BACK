import { Post } from '@domain/models/post.model';
import { CreatePost } from './model';
import { Inject, Injectable } from '@nestjs/common';
import { PostsRepository } from '@domain/repositories/post.repository';

@Injectable()
export class CreatePostUseCase implements CreatePost {
  constructor(
    @Inject()
    private readonly postRepository: PostsRepository,
  ) {}

  async execute(post: Post): Promise<void> {
    return await this.postRepository.insert(post);
  }
}
