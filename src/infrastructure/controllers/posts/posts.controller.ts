import { GetAllPostsUseCase } from '@domain/use-cases/getAllPosts/models';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { POST_USE_CASES } from '@infrastructure/use-cases-proxy/posts-use-cases-proxy';
import { UseCaseProxy } from '@infrastructure/use-cases-proxy/use-cases.provider';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject(POST_USE_CASES.GET_ALL_POSTS_USE_CASE)
    private readonly getAllPostsUseCase: UseCaseProxy<GetAllPostsUseCase>,
  ) {}

  @Get()
  async getPosts() {
    const posts = await this.getAllPostsUseCase.getInstance().execute();
    console.log(posts)
    return [{ id: 1, name: 'gg', description: 'GG' }];
  }
}
