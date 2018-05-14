import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>,
  ) {}

  /**
   * 根据问卷ID加载这个问卷对应的所有问题
   * @param surveyId
   */
  async findAll(surveyId: number): Promise<Question[]> {
    return await this.repository
      .createQueryBuilder('question')
      .where('question.questionnaire.id= :surveyId', { surveyId })
      .orderBy('question.order', 'ASC') // 升序排序
      .getMany();
  }

  /**
   * 根据id查询问题详情
   * @param id
   */
  async findById(id: number): Promise<Question> {
    return await this.repository.findOneOrFail(id);
  }

  async save(question: Question): Promise<Question> {
    return await this.repository.save(question);
  }

  async update(id: number, newQuestion: Question): Promise<Question> {
    await this.repository.update(id, newQuestion);
    return this.findById(id);
  }

  async remove(id: number): Promise<number> {
    await this.repository.delete(id);
    return id;
  }
}
