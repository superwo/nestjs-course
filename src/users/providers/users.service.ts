import { AuthService } from 'src/auth/providers/auth.service';
import { GetUsersParamDto } from './../dtos/get-users-param.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * The constructor to inject the AuthService and the usersRepository
   * @param authService
   * @param usersRepository
   * @returns
   */
  constructor(
    @Inject(forwardRef(() => AuthService)) // Using forwardRef to avoid circular dependency
    private readonly authService: AuthService, // Injecting the AuthService into the UsersService

    @InjectRepository(User) // Injecting the Repository for the User entity
    private usersRepository: Repository<User>, // Injecting the usersRepository to perform database operations
  ) {}

  /**
   * The method to create a new user in the database
   * @param createUserDto
   * @returns
   */
  public async createUser(createUserDto: CreateUserDto) {
    // Check if the user already exists with the same email
    // const existingUser = await this.usersRepository.findOne({
    //   where: { email: createUserDto.email },
    // });
    // Handle exceptions
    // Create a new user

    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  /**
   * The method to get all users from the database
   * @param getUsersParamDto
   * @param limit
   * @param page
   * @returns
   */
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

  /**
   * The method to get a single user from the database
   * @param id
   * @returns
   */
  public async findOneById(id: number) {
    return await this.usersRepository.findOneBy({
      id,
    });
  }
}
