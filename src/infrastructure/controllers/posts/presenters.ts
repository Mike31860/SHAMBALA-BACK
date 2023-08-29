import { Post } from '@infrastructure/models/mongo-db/post.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class PostPresenter implements Post {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: string;

  @ApiProperty({})
  description?: string;

  @ApiProperty({})
  @IsNumber()
  @IsPositive()
  likesCount?: number;
}
