import { CommentId } from '@domain/models/comment.model';
import { PostId } from '@domain/models/post.model';
import { CreateComment } from '@domain/use-cases/comment/createComment/model';
import { DeleteComment } from '@domain/use-cases/comment/deleteComment/model';
import { GetAllComments } from '@domain/use-cases/comment/getAllComment/model';
import { GetCommentById } from '@domain/use-cases/comment/getCommentById/model';
import { GetCommentByPostId } from '@domain/use-cases/comment/getCommentByPostId/model';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { COMMENT_USE_CASES } from '@infrastructure/use-cases-proxy/comment-use-cases-proxy';
import { UseCaseProxy } from '@infrastructure/use-cases-proxy/use-cases.provider';

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserDecorator } from '../decorator';
import { User } from '@domain/models/user.model';
import { ApiBodyType } from '@infrastructure/common/swagger/body.decorator';
import { CommentPresenter } from '../shared/comments.presenter';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('comments')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiBearerAuth('accessToken')
export class CommentsController {
  constructor(
    @Inject(COMMENT_USE_CASES.GET_ALL_COMMENTS_USE_CASE)
    private readonly getAllCommentsUseCase: UseCaseProxy<GetAllComments>,
    @Inject(COMMENT_USE_CASES.DELETE_COMMENT_USE_CASE)
    private readonly deleteCommentUseCase: UseCaseProxy<DeleteComment>,
    @Inject(COMMENT_USE_CASES.GET_COMMENT_BY_ID_USE_CASE)
    private readonly getCommentByiIdUseCase: UseCaseProxy<GetCommentById>,
  ) {}

  @Get()
  async getComments() {
    const comments = await this.getAllCommentsUseCase.getInstance().execute();
    return comments;
  }

  @Delete('/delete')
  async deleteComment(@Query('commentId') commentId: CommentId) {
    await this.deleteCommentUseCase.getInstance().execute(commentId);
  }

  @Get('/:commendId')
  @ApiResponseType(CommentPresenter)
  async findByID(@Param('commendId') commentId: CommentId) {
    return await this.getCommentByiIdUseCase.getInstance().execute(commentId);
  }
}
