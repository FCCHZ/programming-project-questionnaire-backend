import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private readonly repository: Repository<Answer>,
  ) {}

  /**
   * 根据问卷ID加载这个问卷对应的所有问题
   * @param questionId
   */
  async findAll(questionId: number): Promise<Answer[]> {
    return await this.repository
      .createQueryBuilder('answer')
      .where('answer.question.id= :questionId', { questionId })
      .getMany();
  }

  /**
   * 根据id查询问题详情
   * @param id
   */
  async findById(id: number): Promise<Answer> {
    return await this.repository.findOneOrFail(id);
  }

  async save(Answer: Answer): Promise<Answer> {
    return await this.repository.save(Answer);
  }

  async update(id: number, newAnswer: Answer): Promise<Answer> {
    await this.repository.update(id, newAnswer);
    return this.findById(id);
  }

  async remove(id: number): Promise<number> {
    await this.repository.delete(id);
    return id;
  }
}
