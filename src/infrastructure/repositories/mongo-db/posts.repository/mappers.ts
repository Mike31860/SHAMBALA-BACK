import { Post } from '@domain/models/post.model';
import { Post as DBPost } from '@infrastructure/models/mongo-db/post.schema';
export const mapDomainPost = (post: Post): DBPost => {
  return {
    id: post.id,
    description: post.description,
    likesCount: post.likesCount,
  };
};

export const mapModelPost = (post: DBPost): Post => {
  return {
    id: post.id,
    owner: undefined,
    description: post.description,
    likesCount: post.likesCount,
  };
};
