import { GetAllPostsUseCase } from '@domain/use-cases/getAllPosts/models';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { POST_USE_CASES } from '@infrastructure/use-cases-proxy/posts-use-cases-proxy';
import { UseCaseProxy } from '@infrastructure/use-cases-proxy/use-cases.provider';
import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { PostPresenter } from './presenters';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostDTO, postDTOExamples } from './dto';

@Controller('posts')
@ApiTags('posts')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiBearerAuth('accessToken')
@ApiExtraModels(PostPresenter)
export class PostsController {
  constructor(
    @Inject(POST_USE_CASES.GET_ALL_POSTS_USE_CASE)
    private readonly getAllPostsUseCase: UseCaseProxy<GetAllPostsUseCase>,
  ) {}

  @Get()
  @ApiResponseType(PostPresenter, true)
  async getPosts() {
    const posts = await this.getAllPostsUseCase.getInstance().execute();
    console.log(posts);
    return posts;
  }

  @Post()
  @ApiBody({
    type: [PostDTO],
    description: 'Send a new post data',
    examples: postDTOExamples,
  })
  @ApiOperation({ summary: 'Creates a new post and attach it to a given user' })
  @ApiResponseType(PostPresenter, false)
  async insertPost(@Body() post: PostDTO) {
    const createdPosts = await this.getAllPostsUseCase.getInstance().execute();
    return createdPosts.pop();
  }
}
