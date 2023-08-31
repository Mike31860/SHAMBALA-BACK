import { Post, PostId } from '@domain/models/post.model';

export interface GetPostById {
  execute(postId: PostId): Promise<Post>;
}
