import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option) private readonly repository: Repository<Option>,
  ) {}

  /**
   * 根据问卷ID加载这个问卷对应的所有问题
   * @param questionId
   */
  async findAll(questionId: number): Promise<Option[]> {
    return await this.repository
      .createQueryBuilder('option')
      .where('optin.question.id= :questionId', { questionId })
      .getMany();
  }

  /**
   * 根据id查询问题详情
   * @param id
   */
  async findById(id: number): Promise<Option> {
    return await this.repository.findOneOrFail(id);
  }

  async save(Option: Option): Promise<Option> {
    return await this.repository.save(Option);
  }

  async update(id: number, newOption: Option): Promise<Option> {
    await this.repository.update(id, newOption);
    return this.findById(id);
  }

  async remove(id: number): Promise<number> {
    await this.repository.delete(id);
    return id;
  }
}
