import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService, // Injecting the UsersService into the PostsService
  ) {}

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId); // Using the UsersService to find a user by ID

    return [
      {
        user: user,
        title: 'Post 1',
        content: 'Content of Post 1',
      },
      {
        user: user,
        title: 'Post 2',
        content: 'Content of Post 2',
      },
      {
        user: user,
        title: 'Post 3',
        content: 'Content of Post 3',
      },
      {
        user: user,
        title: 'Post 4',
        content: 'Content of Post 4',
      },
      {
        user: user,
        title: 'Post 5',
        content: 'Content of Post 5',
      },
    ];
  }
}
