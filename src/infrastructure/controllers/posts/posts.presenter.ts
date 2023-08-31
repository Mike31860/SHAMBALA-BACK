import { Post } from '@domain/models/post.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostPresenter implements Partial<Post> {

  @ApiProperty()
  id?: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  likesCount?: number;

  @ApiProperty()
  commentsCount?: number;

  @ApiProperty()
  likeUser?: boolean;

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
