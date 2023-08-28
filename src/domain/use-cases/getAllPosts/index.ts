import { Post } from '@domain/models/post.model';
import { PostsRepository } from '@domain/repositories/post.repository';
import { GetAllPostsUseCase } from '@domain/use-cases/getAllPosts/models';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class getAllAppPostsUseCase implements GetAllPostsUseCase {
  constructor(
    @Inject()
    private readonly postsRepository: PostsRepository,
  ) {}
  async execute(): Promise<Post[]> {
    return await this.postsRepository.findAll();
  }
}
