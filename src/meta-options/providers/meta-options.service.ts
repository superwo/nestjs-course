import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    /**
     * Injecting metaOptions repository
     */
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    const metaOption = this.metaOptionsRepository.create(
      createPostMetaOptionsDto,
    );
    return await this.metaOptionsRepository.save(metaOption);
  }
}
