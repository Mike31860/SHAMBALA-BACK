import { Injectable } from '@nestjs/common';
import { PostsRepository } from '@domain/repositories/post.repository';
import { Post } from '@domain/models/post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Post as DBPost } from '@infrastructure/models/mongo-db/post.schema';
import { Model } from 'mongoose';
import { mapDomainPost, mapModelPost } from './mappers';

@Injectable()
export class MongoPostsRepository implements PostsRepository {
  constructor(@InjectModel(DBPost.name) private postModel: Model<DBPost>) {}

  async insert(post: Post): Promise<void> {
    const createdPost = new this.postModel(mapDomainPost(post));
    await createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    const posts: DBPost[] = await this.postModel.find().exec();
    return posts.map(mapModelPost);
  }

  findById(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  update(post: Post): Promise<Post> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
