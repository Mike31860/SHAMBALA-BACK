import { Post } from '@domain/models/post.model';
import { PostsRepository } from '@domain/repositories/post.repository';
import { GetAllPosts } from '@domain/use-cases/post/getAllPosts/models';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetAllPostsUseCase implements GetAllPosts {
  constructor(
    @Inject()
    private readonly postsRepository: PostsRepository,
  ) {}
  async execute(): Promise<Post[]> {
    return await this.postsRepository.findAll();
  }
}
