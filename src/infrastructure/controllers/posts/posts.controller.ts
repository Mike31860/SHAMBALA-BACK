import { PostId, Post as PostDomain } from '@domain/models/post.model';
import { User, UserId } from '@domain/models/user.model';
import { CreatePost } from '@domain/use-cases/post/createPost/model';
import { DeletePost } from '@domain/use-cases/post/deletePost/model';
import { GetPostByUserUserCase } from '@domain/use-cases/post/getAllPostByUser';
import { GetAllPosts } from '@domain/use-cases/post/getAllPosts/models';
import { GetPostById } from '@domain/use-cases/post/getPostById/model';
import { UpdatePost } from '@domain/use-cases/post/updatePost/model';
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
  Req,
  Post,
} from '@nestjs/common';
import { UserDecorator } from '../decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostDTO } from './posts.dto';
import { COMMENT_USE_CASES } from '@infrastructure/use-cases-proxy/comment-use-cases-proxy';
import { CreateComment } from '@domain/use-cases/comment/createComment/model';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { LikePost } from '@domain/use-cases/post/likePost/models';
import { GetCommentByPostId } from '@domain/use-cases/comment/getCommentByPostId/model';
import { CommentPresenter } from '../shared/comments.presenter';
import { mapToPresenter } from './mappers';
import { PostPresenter } from './posts.presenter';

@Controller('posts')
@ApiTags('posts')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiBearerAuth('accessToken')
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
    @Inject(COMMENT_USE_CASES.CREATE_COMMENT_USE_CASE)
    private readonly createCommentUseCase: UseCaseProxy<CreateComment>,
    @Inject(POST_USE_CASES.LIKE_POST_USE_CASE)
    private readonly likePostUseCase: UseCaseProxy<LikePost>,
    @Inject(COMMENT_USE_CASES.GET_COMMENT_BY_POST_ID_USE_CASE)
    private readonly getCommentByPostiIdUseCase: UseCaseProxy<GetCommentByPostId>,
  ) {}

  @Get()
  @ApiResponseType(PostPresenter, true)
  async getPosts(@UserDecorator() userInfo: User) {
    /* item.userIdsLike.some((postFound) => postFound == userInfo.username)) */
    const posts = await this.getAllPostsUseCase.getInstance().execute();
    const allPost = posts.map((post) =>
      mapToPresenter(post, userInfo.username),
    );

    return allPost;
  }

  @Post('create')
  @ApiBody({
    type: [PostDTO],
    description: 'Send a new post data',
  })
  @ApiResponseType(PostPresenter)
  @ApiOperation({ summary: 'Creates a new post and attach it to a given user' })
  async createPost(@UserDecorator() userInfo: User, @Body() post: PostDTO) {
    const postAdd: PostDomain = {
      title: post.title,
      owner: userInfo.username,
      urlImage: post.urlImage,
      description: post.description,
      commentsCount: 0,
      userIdsLike: [],
    };
    return this.createPostsUseCase.getInstance().execute(postAdd);
  }

  @Delete(':postId')
  async deletePosts(@Param('postId') postId: PostId) {
    await this.deletePostsUseCase.getInstance().execute(postId);
  }

  @Get(':postId')
  async findById(@Param('postId') postId: PostId) {
    const post: PostDomain = await this.getPostByIdUseCase
      .getInstance()
      .execute(postId);
    return post;
  }

  @Post(':postId/comment')
  @ApiResponse({ status: 200 })
  async postComment(
    @UserDecorator() user: User,
    @Param('postId') postId: string,
    @Body() comment,
  ) {
    const comm = await this.createCommentUseCase
      .getInstance()
      .execute(user.username, postId, comment.content);
    return comm;
  }

  @Post(':postId/like')
  @ApiResponse({ status: 200 })
  async likePost(@UserDecorator() user: User, @Param('postId') postId: string) {
    const comm = await this.likePostUseCase
      .getInstance()
      .execute(user.username, postId);
    return comm;
  }

  @Get('user/:userId')
  async findPostByUserId(@Param('userId') userId: UserId) {
    const posts = await this.getPostByUserIdUseCase
      .getInstance()
      .execute(userId);

    return posts.map((post) => mapToPresenter(post, userId));
  }

  @Put(':postId')
  async updatePost(
    @UserDecorator() userInfo: User,
    @Param('postId') postId: PostId,
  ) {
    const postFound: PostDomain = await this.findById(postId);
    if (!postFound.userIdsLike.some((item) => item == userInfo.username)) {
      postFound.userIdsLike.push(userInfo.username);

      await this.updatePostUseCase
        .getInstance()
        .execute(mapToPresenter(postFound));
    }
  }

  @Get(':postId/comments')
  @ApiResponseType(CommentPresenter, true)
  async findCommentsByPostId(@Param('postId') postID: PostId) {
    return await this.getCommentByPostiIdUseCase.getInstance().execute(postID);
  }
}
