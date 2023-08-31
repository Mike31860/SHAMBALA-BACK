import { Comment } from '@domain/models/comment.model';
import { CreateComment } from './model';
import { CommentRepository } from '@domain/repositories/comment.repository';
import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class CreateCommentUseCase implements CreateComment {
  constructor(
    @Inject()
    private readonly commentRepository: CommentRepository,
  ) {}

  async execute(comment: Comment): Promise<void> {
    await this.commentRepository.addComment(comment);
  }
}
