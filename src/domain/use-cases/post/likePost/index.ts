import { Post } from '@domain/models/post.model';
import { Inject, Injectable } from '@nestjs/common';
import { PostsRepository } from '@domain/repositories/post.repository';
import { LikePost } from './models';

@Injectable()
export class LikePostUseCase implements LikePost {
  constructor(
    @Inject()
    private readonly postRepository: PostsRepository,
  ) {}

  async execute(liker: string, postId: string): Promise<Post> {
    const post = await this.postRepository.findById(postId);

    const hasLiked = post?.userIdsLike?.find((id) => id === liker);

    let newUserIdsLike = [...post.userIdsLike, liker];
    if (hasLiked) {
      newUserIdsLike = newUserIdsLike.filter((id) => id !== liker);
    }

    const updatedPost: Post = {
      ...post,
      userIdsLike: newUserIdsLike,
    };

    await this.postRepository.updatePost(updatedPost);

    return updatedPost;
  }
}
