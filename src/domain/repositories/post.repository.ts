import { Post, PostId } from '@domain/models/post.model';
import { UserId } from '@domain/models/user.model';

export interface PostsRepository {
  insert(post: Post): Promise<void>;
  findAll(): Promise<Post[]>;
  findById(id: PostId): Promise<Post>;
  findByUser(userId: UserId): Promise<Post[]>;
  deleteById(id: PostId): Promise<void>;
  updatePost(post: Post): Promise<void>;
}

export const PostsRepository = Symbol('PostsRepository');
