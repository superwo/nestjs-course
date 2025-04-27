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

  public async delete(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    await this.postsRepository.delete(id);

    if (post && post.metaOptions) {
      await this.metaOptionsRepository.delete(post.metaOptions.id);
    }

    return { deleted: true, id };
  }
}
