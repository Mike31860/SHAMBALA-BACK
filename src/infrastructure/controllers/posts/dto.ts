import { Post } from '@domain/models/post.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class PostDTO implements Partial<Post> {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  owner: string;

  @ApiProperty()
  @IsNotEmpty()
  description?: string;
}

export const postDTOExamples: Record<string, PostDTO> = {
  example: {
    id: '1',
    owner: '2as13svq32',
    description: 'New post by ammin',
  },
};
