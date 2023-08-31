import { Post } from '@domain/models/post.model';
import { PostPresenter } from './posts.presenter';
import { UserId } from '@domain/models/user.model';

export const mapToPresenter = (
  post: Post,
  currentUser?: UserId,
): PostPresenter => {
  return {
    owner: post.owner,
    title: post.title,
    urlImage: post.urlImage,
    commentsCount: post.commentsCount,
    likesCount: post?.userIdsLike?.length ?? 0,
    description: post.description,
    id: post.id,
    likeUser: post?.userIdsLike?.some((id) => id == currentUser) ?? false,
  };
};
