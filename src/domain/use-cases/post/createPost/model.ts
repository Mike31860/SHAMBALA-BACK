import { Post } from '@domain/models/post.model';

export interface CreatePost {
  execute(post: Post): Promise<void>;
}
