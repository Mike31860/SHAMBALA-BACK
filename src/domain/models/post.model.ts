import { Comment } from './comment.model';
import { UserId } from './user.model';

export type PostId = string;

export interface Post {
  id: PostId;
  owner: UserId;
  description?: string;
  comments?: Comment[];
  likesCount?: number;
}
