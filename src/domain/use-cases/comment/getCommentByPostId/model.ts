import { Comment } from '@domain/models/comment.model';
import { PostId } from '@domain/models/post.model';

export interface GetCommentByPostId {
  execute(postId: PostId): Promise<Comment[]>;
}
