import { Post } from '@domain/models/post.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostDTO implements Partial<Post> {
  @ApiProperty()
  title: string;
  @ApiProperty()
  urlImage: string;
  @ApiProperty()
  description?: string;
}

export class CreateCommentDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  content: string;
}
