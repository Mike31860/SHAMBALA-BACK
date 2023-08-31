import { Post } from '@domain/models/post.model';
import { GetPostById } from './model';
import { PostsRepository } from '@domain/repositories/post.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetPostByIdUseCase implements GetPostById {
  constructor(
    @Inject()
    private readonly postRepository: PostsRepository,
  ) {}

  async execute(postId: string): Promise<Post> {
    try {
      const postFound: Post = await this.postRepository.findById(postId);
      return postFound;
    } catch (error) {
      throw new NotFoundException('Post has not been found');
    }
  }
}
