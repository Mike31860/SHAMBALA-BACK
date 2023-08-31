import { Injectable } from '@nestjs/common';
import { PostsRepository } from '@domain/repositories/post.repository';
import { PostId, Post } from '@domain/models/post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Post as DBPost } from '@infrastructure/models/mongo-db/post.schema';
import { Model } from 'mongoose';
import { mapDomainPost, mapModelPost } from './mappers';

@Injectable()
export class MongoPostsRepository implements PostsRepository {
  constructor(@InjectModel(DBPost.name) private postModel: Model<DBPost>) {}

  async updatePost(post: Post): Promise<void> {
    const { _id, ...updatePost } = mapDomainPost(post);
    await this.postModel.updateOne({ _id: _id }, updatePost).exec();
  }

  async findByUser(userId: string): Promise<Post[]> {
    const posts: DBPost[] = await this.postModel.find({ owner: userId }).exec();
    return posts.map(mapModelPost);
  }

  async insert(post: Post): Promise<void> {
    const createdPost = new this.postModel(mapDomainPost(post));
    await createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    const posts: DBPost[] = await this.postModel.find().exec();
    return posts.map(mapModelPost);
  }

  async findById(postId: PostId): Promise<Post> {
    const postt: DBPost = await this.postModel.findById(postId).exec();
    return mapModelPost(postt);
  }

  async deleteById(postId: PostId): Promise<void> {
    const postt = { _id: postId };
    await this.postModel.deleteOne(postt);
  }
}
