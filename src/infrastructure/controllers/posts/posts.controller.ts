import { PostId, Post as PostDomain } from '@domain/models/post.model';
import { User, UserId } from '@domain/models/user.model';
import { CreatePost } from '@domain/use-cases/post/createPost/model';
import { DeletePost } from '@domain/use-cases/post/deletePost/model';
import { GetPostByUserUserCase } from '@domain/use-cases/post/getAllPostByUser';
import { GetAllPosts } from '@domain/use-cases/post/getAllPosts/models';
import { GetPostById } from '@domain/use-cases/post/getPostById/model';
import { UpdatePost } from '@domain/use-cases/post/updatePost/model';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { POST_USE_CASES } from '@infrastructure/use-cases-proxy/posts-use-cases-proxy';
import { UseCaseProxy } from '@infrastructure/use-cases-proxy/use-cases.provider';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { PostDTO } from './posts.dto';
import { UserDecorator } from '../decorator';
import { NotFoundException } from '@domain/exceptions/NoFoundException';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(POST_USE_CASES.GET_ALL_POSTS_USE_CASE)
    private readonly getAllPostsUseCase: UseCaseProxy<GetAllPosts>,
    @Inject(POST_USE_CASES.CREATE_POST_USE_CASE)
    private readonly createPostsUseCase: UseCaseProxy<CreatePost>,
    @Inject(POST_USE_CASES.DELETE_POST_USE_CASE)
    private readonly deletePostsUseCase: UseCaseProxy<DeletePost>,
    @Inject(POST_USE_CASES.GET_POST_BY_ID_USE_CASE)
    private readonly getPostByIdUseCase: UseCaseProxy<GetPostById>,
    @Inject(POST_USE_CASES.UPDATE_POST_USE_CASE)
    private readonly updatePostUseCase: UseCaseProxy<UpdatePost>,
    @Inject(POST_USE_CASES.GET_POST_BY_USER_ID_USE_CASE)
    private readonly getPostByUserIdUseCase: UseCaseProxy<GetPostByUserUserCase>,
  ) {}

  @Get()
  async getPosts(@UserDecorator() userInfo) {
    /* item.userIdsLike.some((postFound) => postFound == userInfo.username)) */
    const posts = await this.getAllPostsUseCase.getInstance().execute();
    const allPost = posts.map((item) => {
      const postUpdated: PostDomain = {
        id: item.id,
        title: item.title,
        owner: item.owner,
        urlImage: item.urlImage,
        description: item.description,
        likesCount: item.likesCount,
        commentsCount: item.commentsCount,
        likeUser: item.userIdsLike.some(
          (userId) => userId == userInfo.username,
        ),
      };

      return postUpdated;
    });
    return allPost;
  }

  @Post('create')
  async createPost(@UserDecorator() userInfo: User, @Body() post: PostDTO) {
    const postAdd: PostDomain = {
      title: post.title,
      owner: userInfo.username,
      urlImage: post.urlImage,
      description: post.description,
      likesCount: 0,
      commentsCount: 0,
      userIdsLike: [],
    };
    const postCreated = await this.createPostsUseCase
      .getInstance()
      .execute(postAdd);
    return postCreated;
  }

  @Delete('delete/:postId')
  async deletePosts(@Param('postId') postId: PostId) {
    await this.deletePostsUseCase.getInstance().execute(postId);
  }

  @Get('find/:postId')
  async findById(@Param('postId') postId: PostId) {
    const post: PostDomain = await this.getPostByIdUseCase
      .getInstance()
      .execute(postId);
    return post;
  }

  @Get('user/:userId')
  async findPostByUserId(@Param('userId') userId: UserId) {
    const post = await this.getPostByUserIdUseCase
      .getInstance()
      .execute(userId);

    return post;
  }

  @Put('update/:postId')
  async updatePost(
    @UserDecorator() userInfo: User,
    @Param('postId') postId: PostId,
  ) {
    const postFound: PostDomain = await this.findById(postId);
    if (!postFound.userIdsLike.some((item) => item == userInfo.username)) {
      postFound.userIdsLike.push(userInfo.username);
      const postUpdate: PostDomain = {
        id: postFound.id,
        title: postFound.title,
        owner: postFound.owner,
        urlImage: postFound.urlImage,
        description: postFound.description,
        commentsCount: postFound.commentsCount,
        likesCount: postFound.likesCount + 1,
        userIdsLike: postFound.userIdsLike,
      };
      await this.updatePostUseCase.getInstance().execute(postUpdate);
    }
  }
}
