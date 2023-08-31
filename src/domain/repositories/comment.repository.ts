import { Comment, CommentId } from '@domain/models/comment.model';
import { PostId } from '@domain/models/post.model';

export interface CommentRepository {
  addComment(comment: Comment): Promise<void>;
  findAll(): Promise<Comment[]>;
  findById(commentId: CommentId): Promise<Comment>;
  findCommentsByPostId(postId: PostId): Promise<Comment[]>;
  deleteById(commentId: CommentId): Promise<void>;
}
