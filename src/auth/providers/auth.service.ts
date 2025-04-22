import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) // Using forwardRef to avoid circular dependency
    private readonly usersService: UsersService, // Injecting the UsersService into the AuthService
  ) {}

  public login(email: string, password: string, id: string) {
    // Check if the user exists in the database
    const user = this.usersService.findOneById('1234');
    // login
    // token
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
