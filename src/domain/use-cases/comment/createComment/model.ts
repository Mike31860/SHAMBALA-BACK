import { PostId } from '@domain/models/post.model';
import { UserId } from '@domain/models/user.model';

export interface CreateComment {
  execute(creator: UserId, postId: PostId, content: string): Promise<void>;
}
