import { Comment } from '@domain/models/comment.model';

export interface CreateComment {
  execute(comment: Comment): Promise<void>;
}
