import { PostId } from '@domain/models/post.model';
import { UserId } from '@domain/models/user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  _id: Types.ObjectId;
  @Prop({ required: true })
  postId: PostId;
  @Prop({ required: true })
  owner: UserId;
  @Prop({ required: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
