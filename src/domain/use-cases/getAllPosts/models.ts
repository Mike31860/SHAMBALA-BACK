import { Post } from '@domain/models/post.model';

export interface GetAllPostsUseCase {
  execute(): Promise<Post[]>;
}
