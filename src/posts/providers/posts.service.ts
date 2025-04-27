import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

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
    /**
     * Inject metaOptionsRepository to access the database
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Creating new post
   */
  public async create(createPostDto: CreatePostDto) {
    // Create the metaOptions first if they exist
    const metaOptions = createPostDto.metaOptions
      ? this.metaOptionsRepository.create(createPostDto.metaOptions)
      : null;

    if (metaOptions) {
      await this.metaOptionsRepository.save(metaOptions);
    }

    // Create the post
    const post = this.postsRepository.create({
      ...createPostDto,
      metaOptions: createPostDto.metaOptions || undefined,
    });

    // If meta options exist add them to post
    if (metaOptions) {
      post.metaOptions = metaOptions;
    }

    return await this.postsRepository.save(post);
  }

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
