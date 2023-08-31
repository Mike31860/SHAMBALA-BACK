import { Comment } from '@domain/models/comment.model';
import { CommentRepository } from '@domain/repositories/comment.repository';
import { Comment as DBComment } from '@infrastructure/models/mongo-db/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mapDomainComment, mapModelComment } from './mappers';

export class MongoCommentRepository implements CommentRepository {
  constructor(
    @InjectModel(DBComment.name) private commentModel: Model<DBComment>,
  ) {}

  async findCommentsByPostId(postIdd: string): Promise<Comment[]> {
    const comments: DBComment[] = await this.commentModel
      .find({
        postId: postIdd,
      })
      .exec();
    return comments.map(mapModelComment);
  }

  async addComment(comment: Comment): Promise<void> {
    const createComment = new this.commentModel(mapDomainComment(comment));
    await createComment.save({ validateBeforeSave: true });
  }
  async findAll(): Promise<Comment[]> {
    const comments: DBComment[] = await this.commentModel.find().exec();
    return comments.map(mapModelComment);
  }
  async findById(commentId: string): Promise<Comment> {
    const findOne: DBComment = await this.commentModel.findById(commentId);

    return mapModelComment(findOne);
  }

  async deleteById(commentId: string): Promise<void> {
    const filter = { _id: commentId };
    await this.commentModel.deleteOne(filter);
  }
}
