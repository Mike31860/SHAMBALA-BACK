import { Provider } from '@nestjs/common';
import { UseCaseProxy } from './use-cases.provider';
import { GetAllPostsUseCase } from '@domain/use-cases/post/getAllPosts/index';
import { MongoPostsRepository } from '@infrastructure/repositories/mongo-db/posts.repository';
import { PostsRepository } from '@domain/repositories/post.repository';
import { DeletePostUseCase } from '@domain/use-cases/post/deletePost';
import { CreatePostUseCase } from '@domain/use-cases/post/createPost';
import { GetPostByIdUseCase } from '@domain/use-cases/post/getPostById';
import { UpdatePostUseCase } from '@domain/use-cases/post/updatePost';
import { GetPostByUserUserCase } from '@domain/use-cases/post/getAllPostByUser';
import { LikePostUseCase } from '@domain/use-cases/post/likePost';

export enum POST_USE_CASES {
  GET_ALL_POSTS_USE_CASE = 'getAllPostsUseCase',
  DELETE_POST_USE_CASE = 'deletePostUseCase',
  CREATE_POST_USE_CASE = 'createPostUseCase',
  GET_POST_BY_ID_USE_CASE = 'findPostByIdUseCase',
  UPDATE_POST_USE_CASE = 'updatePostUseCase',
  GET_POST_BY_USER_ID_USE_CASE = 'getPostByUserIdUseCase',
  LIKE_POST_USE_CASE = 'likePostUseCase',
}

export const postsUseCaseExports: string[] = [
  POST_USE_CASES.GET_ALL_POSTS_USE_CASE,
  POST_USE_CASES.DELETE_POST_USE_CASE,
  POST_USE_CASES.CREATE_POST_USE_CASE,
  POST_USE_CASES.GET_POST_BY_ID_USE_CASE,
  POST_USE_CASES.UPDATE_POST_USE_CASE,
  POST_USE_CASES.GET_POST_BY_USER_ID_USE_CASE,
  POST_USE_CASES.LIKE_POST_USE_CASE,
];

export const postsUseCasesProviders: Provider[] = [
  {
    inject: [MongoPostsRepository],
    provide: POST_USE_CASES.GET_ALL_POSTS_USE_CASE,
    useFactory: (postsRepository: PostsRepository) =>
      new UseCaseProxy(new GetAllPostsUseCase(postsRepository)),
  },
  {
    inject: [MongoPostsRepository],
    provide: POST_USE_CASES.LIKE_POST_USE_CASE,
    useFactory: (postsRepository: PostsRepository) =>
      new UseCaseProxy(new LikePostUseCase(postsRepository)),
  },
  {
    inject: [MongoPostsRepository],
    provide: POST_USE_CASES.DELETE_POST_USE_CASE,
    useFactory: (postsRepository: PostsRepository) =>
      new UseCaseProxy(new DeletePostUseCase(postsRepository)),
  },
  {
    inject: [MongoPostsRepository],
    provide: POST_USE_CASES.CREATE_POST_USE_CASE,
    useFactory: (postsRepository: PostsRepository) =>
      new UseCaseProxy(new CreatePostUseCase(postsRepository)),
  },
  {
    inject: [MongoPostsRepository],
    provide: POST_USE_CASES.GET_POST_BY_ID_USE_CASE,
    useFactory: (postsRepository: PostsRepository) =>
      new UseCaseProxy(new GetPostByIdUseCase(postsRepository)),
  },
  {
    inject: [MongoPostsRepository],
    provide: POST_USE_CASES.UPDATE_POST_USE_CASE,
    useFactory: (postsRepository: PostsRepository) =>
      new UseCaseProxy(new UpdatePostUseCase(postsRepository)),
  },
  {
    inject: [MongoPostsRepository],
    provide: POST_USE_CASES.GET_POST_BY_USER_ID_USE_CASE,
    useFactory: (postsRepository: PostsRepository) =>
      new UseCaseProxy(new GetPostByUserUserCase(postsRepository)),
  },
];
