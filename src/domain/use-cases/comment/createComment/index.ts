import { Comment } from '@domain/models/comment.model';
import { CreateComment } from './model';
import { CommentRepository } from '@domain/repositories/comment.repository';
import { Inject, Injectable } from '@nestjs/common';
import { PostId } from '@domain/models/post.model';
import { UserId } from '@domain/models/user.model';

@Injectable()
export class CreateCommentUseCase implements CreateComment {
  constructor(
    @Inject()
    private readonly commentRepository: CommentRepository,
  ) {}

  async execute(
    creator: UserId,
    postId: PostId,
    content: string,
  ): Promise<void> {
    const comment: Comment = {
      owner: creator,
      postId: postId,
      content: content,
    };
    await this.commentRepository.addComment(comment);
  }
}
