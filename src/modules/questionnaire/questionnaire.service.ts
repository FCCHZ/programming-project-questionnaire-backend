import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly repository: Repository<Questionnaire>,
  ) {}

  /**
   * 分页查询
   * @param page
   * @param pageSize
   */
  async pagination(
    page: number,
    pageSize: number,
  ): Promise<[Questionnaire[], number]> {
    const skip = (page - 1) * pageSize;
    return await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();
  }

  /**
   * 根据id查询
   * @param id
   */
  async findById(id: number): Promise<Questionnaire> {
    return await this.repository.findOneOrFail(id);
  }

  /**
   * 保存一个问卷
   * @param entity
   */
  async save(entity: Questionnaire): Promise<Questionnaire> {
    return await this.repository.save(entity);
  }

  /**
   * 修改一个问卷
   * @param id
   * @param newEntity
   */
  async update(id: number, newEntity: Questionnaire): Promise<Questionnaire> {
    await this.repository.update(id, newEntity);
    return await this.findById(id);
  }

  /**
   * 根据id删除一个问卷
   * @param id
   */
  async remove(id: number) {
    await this.repository.delete(id);
    return id;
  }
}
