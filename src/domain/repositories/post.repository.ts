import { Post, PostId } from '@domain/models/post.model';

export interface PostsRepository {
  insert(post: Post): Promise<void>;
  findAll(): Promise<Post[]>;
  findById(id: PostId): Promise<PostId>;
  update(post: Post): Promise<Post>;
  deleteById(id: PostId): Promise<void>;
}

export const PostsRepository = Symbol('PostsRepository');
