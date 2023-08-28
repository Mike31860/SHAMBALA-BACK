import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  id: string;

  @Prop()
  description?: string;

  @Prop()
  likesCount?: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
