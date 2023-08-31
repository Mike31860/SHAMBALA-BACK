import { PostId } from './post.model';
import { UserId } from './user.model';

export type CommentId = string;

export interface Comment {
  id: CommentId;
  postId: PostId;
  owner: UserId;
  content: string;
}
