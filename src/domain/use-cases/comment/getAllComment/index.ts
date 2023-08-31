import { CommentRepository } from '@domain/repositories/comment.repository';
import { GetAllComments } from './model';
import { Inject, Injectable } from '@nestjs/common';
import { Comment } from '@domain/models/comment.model';
@Injectable()
export class GetAllCommentUseCase implements GetAllComments {
  constructor(
    @Inject()
    private readonly commentRepository: CommentRepository,
  ) {}

  async execute(): Promise<Comment[]> {
    return await this.commentRepository.findAll();
  }
}
