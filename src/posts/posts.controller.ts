import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
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
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
}
