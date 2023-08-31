import { Comment } from '@domain/models/comment.model';

export interface GetAllComments {
  execute(): Promise<Comment[]>;
}
