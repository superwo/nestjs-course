import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:id')
  public getUsers(@Param() params: any, @Query() query: any) {
    console.log(params);
    console.log(query);
    return 'You sent a GET request to /users';
  }

  @Post()
  public createUsers(@Body() request: any) {
    console.log(request);
    return 'You sent a POST request to /users';
  }
}
