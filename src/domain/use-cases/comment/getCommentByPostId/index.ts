import { Inject, Injectable } from '@nestjs/common';
import { GetCommentByPostId } from './model';
import { CommentRepository } from '@domain/repositories/comment.repository';
import { Comment } from '@domain/models/comment.model';

@Injectable()
export class GetCommentByPostIdUseCase implements GetCommentByPostId {
  constructor(
    @Inject()
    private readonly commentRepository: CommentRepository,
  ) {}

  async execute(postId: string): Promise<Comment[]> {
    return await this.commentRepository.findCommentsByPostId(postId);
  }
}
