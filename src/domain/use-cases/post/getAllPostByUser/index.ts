import { Post } from '@domain/models/post.model';
import { GetAllPostByUserId } from './model';
import { PostsRepository } from '@domain/repositories/post.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetPostByUserUserCase implements GetAllPostByUserId {
  constructor(
    @Inject()
    private readonly postRepository: PostsRepository,
  ) {}

  async execute(userId: string): Promise<Post[]> {
    return await this.postRepository.findByUser(userId);
  }
}
