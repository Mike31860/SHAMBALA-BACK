import { UserId } from './user.model';

export type CommentId = string;

export interface Comment {
  id: CommentId;
  owner: UserId;
  content: string;
}
