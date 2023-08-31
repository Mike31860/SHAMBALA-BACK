import { CommentRepository } from '@domain/repositories/comment.repository';
import { DeleteComment } from './model';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteCommentUseCase implements DeleteComment {
  constructor(
    @Inject()
    private readonly commentRepository: CommentRepository,
  ) {}

  async execute(commentId: string): Promise<void> {
    return await this.commentRepository.deleteById(commentId);
  }
}
