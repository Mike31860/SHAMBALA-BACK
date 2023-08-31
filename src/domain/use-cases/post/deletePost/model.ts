import { PostId } from "@domain/models/post.model";

export interface DeletePost {
    execute(postId: PostId): Promise<void>;
}