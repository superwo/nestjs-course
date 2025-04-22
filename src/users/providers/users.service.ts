import { GetUsersParamDto } from './../dtos/get-users-param.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Jane',
        email: 'jane@doe.com',
      },
    ];
  }

  public findOneById(id: number) {
    return {
      id: 1234,
      firstName: 'Jane',
      email: 'jane@doe.com',
    };
  }
}
