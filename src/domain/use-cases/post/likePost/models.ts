import { Post, PostId } from '@domain/models/post.model';
import { UserId } from '@domain/models/user.model';

export interface LikePost {
  execute(liker: UserId, postId: PostId): Promise<Post>;
}
