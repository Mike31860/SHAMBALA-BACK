import { Post } from '@domain/models/post.model';

export class PostDTO implements Partial<Post> {
  title: string;
  urlImage: string;
  description?: string;
}
