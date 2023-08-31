import { Comment } from '@domain/models/comment.model';
import { Comment as DBComment } from '@infrastructure/models/mongo-db/comment.schema';
import { Types } from 'mongoose';
export const mapDomainComment = (comment: Comment): DBComment => {
  const commentDb: DBComment = {
    _id: new Types.ObjectId(comment.id),
    postId: comment.postId,
    owner: comment.owner,
    content: comment.content,
  };
  return commentDb;
};

export const mapModelComment = (comment: DBComment): Comment => {
  const DBModelComment = {
    id: comment._id.toString(),
    postId: comment.postId,
    owner: comment.owner,
    content: comment.content,
  };
  return DBModelComment;
};
