import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option) private readonly repository: Repository<Option>,
  ) {}
}
