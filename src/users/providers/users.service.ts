import { AuthService } from 'src/auth/providers/auth.service';
import { GetUsersParamDto } from './../dtos/get-users-param.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService)) // Using forwardRef to avoid circular dependency
    private readonly authService: AuthService, // Injecting the AuthService into the UsersService
  ) {}
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth(); // Using the AuthService to check if the user is authenticated
    console.log(isAuth);

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

  public findOneById(id: string) {
    return {
      id: 1234,
      firstName: 'Jane',
      email: 'jane@doe.com',
    };
  }
}
