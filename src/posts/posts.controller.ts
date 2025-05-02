import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    /*
     * Injecting the PostsService into the PostsController
     */
    private readonly postsService: PostsService,
  ) {}

  /*
   * GET localhost:3300/posts/:userId
   */
  @Get('{/:userId}')
  public getPosts(@Param('userId') userId: number) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response when the post is created successfully',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Update an existing post',
  })
  @ApiResponse({
    status: 200,
    description:
      'A 200 response indicates that the post was updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostDto) {
    console.log(patchPostsDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
