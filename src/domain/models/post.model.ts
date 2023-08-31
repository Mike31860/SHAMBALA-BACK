import { Comment } from './comment.model';
import { UserId } from './user.model';

export type PostId = string;

export interface Post {
  id?: PostId;
  title: string;
  owner: UserId;
  urlImage?: string;
  description?: string;
  commentsCount?: number;
  userIdsLike?: string[];
}
