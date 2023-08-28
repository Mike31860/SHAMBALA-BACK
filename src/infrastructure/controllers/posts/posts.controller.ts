import { Controller, Get } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  async getPosts() {
    return [{ id: 1, name: 'gg', description: 'GG' }];
  }
}
