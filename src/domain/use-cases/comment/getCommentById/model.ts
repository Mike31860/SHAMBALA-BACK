import { Comment, CommentId } from '@domain/models/comment.model';

export interface GetCommentById {
  execute(commentId: CommentId): Promise<Comment>;
}
