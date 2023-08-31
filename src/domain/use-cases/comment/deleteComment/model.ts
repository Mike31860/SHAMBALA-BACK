import { CommentId } from '@domain/models/comment.model';

export interface DeleteComment {
  execute(commentId: CommentId): Promise<void>;
}
