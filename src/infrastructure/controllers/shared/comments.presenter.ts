import { Comment } from '@domain/models/comment.model';
import { ApiProperty } from '@nestjs/swagger';

export class CommentPresenter implements Comment {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  postId: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  content: string;
}
