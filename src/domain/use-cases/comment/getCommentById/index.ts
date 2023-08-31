import { Comment } from '@domain/models/comment.model';
import { GetCommentById } from './model';
import { Inject, Injectable } from '@nestjs/common';
import { CommentRepository } from '@domain/repositories/comment.repository';

@Injectable()
export class GetCommentByIdUseCase implements GetCommentById {
  constructor(
    @Inject()
    private readonly commentRepository: CommentRepository,
  ) {}
  async execute(commentId: string): Promise<Comment> {
    return await this.commentRepository.findById(commentId);
  }
}
