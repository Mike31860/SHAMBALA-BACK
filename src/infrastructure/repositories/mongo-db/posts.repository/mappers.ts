import { Post } from '@domain/models/post.model';
import { Post as DBPost } from '@infrastructure/models/mongo-db/post.schema';
export const mapDomainPost = (post: Post): DBPost => {
  return {
    _id: post.id,
    owner: post.owner,
    title: post.title,
    urlImage: post.urlImage,
    description: post.description,
    likesCount: post.likesCount,
    commentsCount: post.commentsCount,
  };
};

export const mapModelPost = (post: DBPost): Post => {
  return {
    id: post._id,
    title: post.title,
    urlImage: post.urlImage,
    owner: post.owner,
    description: post.description,
    likesCount: post.likesCount,
    commentsCount: post.commentsCount,
  };
};
