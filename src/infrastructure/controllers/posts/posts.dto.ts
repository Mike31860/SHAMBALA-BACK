import { Post } from '@domain/models/post.model';
import { ApiProperty } from '@nestjs/swagger';

export class PostDTO implements Partial<Post> {
  @ApiProperty()
  title: string;
  @ApiProperty()
  urlImage: string;
  @ApiProperty()
  description?: string;
}
