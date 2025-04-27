import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting the UsersService to access user-related functionalities
     */
    private readonly usersService: UsersService,
    /**
     * Inject postsRepository to access the database
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /**
   * Creating new post
   */
  public async create(createPostDto: CreatePostDto) {
    // Create the post
    const post = this.postsRepository.create({
      ...createPostDto,
      metaOptions: createPostDto.metaOptions ?? undefined,
    });

    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    console.log(user);

    const posts = await this.postsRepository.find({});

    return posts;
  }
}
