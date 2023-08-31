import { CommentRepository } from '@domain/repositories/comment.repository';
import { GetAllCommentUseCase } from '@domain/use-cases/comment/getAllComment';
import { MongoPostsRepository } from '@infrastructure/repositories/mongo-db/posts.repository';
import { UseCaseProxy } from './use-cases.provider';
import { Provider } from '@nestjs/common';
import { MongoCommentRepository } from '@infrastructure/repositories/mongo-db/comment.repository';
import { CreateCommentUseCase } from '@domain/use-cases/comment/createComment';
import { DeleteCommentUseCase } from '@domain/use-cases/comment/deleteComment';
import { GetCommentByIdUseCase } from '@domain/use-cases/comment/getCommentById';
import { GetPostByIdUseCase } from '@domain/use-cases/post/getPostById';
import { GetCommentByPostIdUseCase } from '@domain/use-cases/comment/getCommentByPostId';

export enum COMMENT_USE_CASES {
  GET_ALL_COMMENTS_USE_CASE = 'getAllCommentsUseCase',
  CREATE_COMMENT_USE_CASE = 'createCommentUseCase',
  DELETE_COMMENT_USE_CASE = 'deleteComment',
  GET_COMMENT_BY_ID_USE_CASE = 'getCommentById',
  GET_COMMENT_BY_POST_ID_USE_CASE = 'getCommentByPostId',
}

export const commentsUseCaseExports: string[] = [
  COMMENT_USE_CASES.GET_ALL_COMMENTS_USE_CASE,
  COMMENT_USE_CASES.CREATE_COMMENT_USE_CASE,
  COMMENT_USE_CASES.DELETE_COMMENT_USE_CASE,
  COMMENT_USE_CASES.GET_COMMENT_BY_ID_USE_CASE,
  COMMENT_USE_CASES.GET_COMMENT_BY_POST_ID_USE_CASE,
];

export const commentsUseCasesProviders: Provider[] = [
  {
    inject: [MongoCommentRepository],
    provide: COMMENT_USE_CASES.GET_ALL_COMMENTS_USE_CASE,
    useFactory: (commentsRepository: CommentRepository) =>
      new UseCaseProxy(new GetAllCommentUseCase(commentsRepository)),
  },
  {
    inject: [MongoCommentRepository],
    provide: COMMENT_USE_CASES.CREATE_COMMENT_USE_CASE,
    useFactory: (commentsRepository: CommentRepository) =>
      new UseCaseProxy(new CreateCommentUseCase(commentsRepository)),
  },
  {
    inject: [MongoCommentRepository],
    provide: COMMENT_USE_CASES.DELETE_COMMENT_USE_CASE,
    useFactory: (commentsRepository: CommentRepository) =>
      new UseCaseProxy(new DeleteCommentUseCase(commentsRepository)),
  },
  {
    inject: [MongoCommentRepository],
    provide: COMMENT_USE_CASES.GET_COMMENT_BY_ID_USE_CASE,
    useFactory: (commentsRepository: CommentRepository) =>
      new UseCaseProxy(new GetCommentByIdUseCase(commentsRepository)),
  },
  {
    inject: [MongoCommentRepository],
    provide: COMMENT_USE_CASES.GET_COMMENT_BY_POST_ID_USE_CASE,
    useFactory: (commentsRepository: CommentRepository) =>
      new UseCaseProxy(new GetCommentByPostIdUseCase(commentsRepository)),
  },
];
