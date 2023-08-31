import { Post } from '@domain/models/post.model';

export interface GetAllPosts {
  execute(): Promise<Post[]>;
}
