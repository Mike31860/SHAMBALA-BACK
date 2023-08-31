import { PostsRepository } from '@domain/repositories/post.repository';
import { DeletePost } from './model';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeletePostUseCase implements DeletePost {
  constructor(
    @Inject()
    private readonly posrRepository: PostsRepository,
  ) {}

  async execute(postId: string): Promise<void> {
    await this.posrRepository.deleteById(postId);
  }
}
