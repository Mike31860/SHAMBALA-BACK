import { PostId } from '@domain/models/post.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  _id: PostId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  urlImage: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  likesCount?: number;

  @Prop()
  commentsCount?: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
