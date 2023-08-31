import { Post } from '@domain/models/post.model';
import { UserId } from '@domain/models/user.model';

export interface GetAllPostByUserId {
  execute(userId: UserId): Promise<Post[]>;
}
