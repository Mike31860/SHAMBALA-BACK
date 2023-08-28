import { Provider } from '@nestjs/common';
import { UseCaseProxy } from './use-cases.provider';
import { getAllAppPostsUseCase } from '@domain/use-cases/getAllPosts';
import { MongoPostsRepository } from '@infrastructure/repositories/mongo-db/posts.repository';
import { PostsRepository } from '@domain/repositories/post.repository';

export enum POST_USE_CASES {
  GET_ALL_POSTS_USE_CASE = 'getAllPostsUseCase',
}

export const postsUseCaseExports: string[] = [
  POST_USE_CASES.GET_ALL_POSTS_USE_CASE,
];

export const postsUseCasesProviders: Provider[] = [
  {
    inject: [MongoPostsRepository],
    provide: POST_USE_CASES.GET_ALL_POSTS_USE_CASE,
    useFactory: (postsRepository: PostsRepository) =>
      new UseCaseProxy(new getAllAppPostsUseCase(postsRepository)),
  },
];
