import { Post } from '@domain/models/post.model';

export interface UpdatePost {
  execute(post: Post): Promise<void>;
}
