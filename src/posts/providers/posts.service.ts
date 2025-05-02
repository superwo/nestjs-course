import { Injectable } from '@nestjs/common';
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
    // Find the author
    const author = await this.usersService.findOneById(createPostDto.authorId);

    // Create the post
    if (!author) {
      throw new Error('Author not found');
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      metaOptions: createPostDto.metaOptions ?? undefined,
      author: author,
    });

    return await this.postsRepository.save(post);
  }

  public async findAll(userId: number) {
    console.log('userId', userId);
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
      },
    });

    return posts;
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
