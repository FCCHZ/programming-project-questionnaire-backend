import { Injectable } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Option } from '../option/option.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
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

  /**
   * 保存问题的时候同时保存问题的选项
   * @param question
   * @param options
   */
  async save(question: Question, options: Option[]): Promise<Question> {
    return await getManager().transaction(async transactionalEntityManager => {
      const result = await transactionalEntityManager.save(question);

      if (options.length > 0) {
        await Promise.all(
          options.map(async option => {
            await transactionalEntityManager.save(option);
          }),
        );
      }
      return result;
    });
  }

  /**
   * 修改一个问题，将这个问题下已有的选项去掉，再重新保存
   * @param id
   * @param newQuestion
   * @param options
   */
  async update(
    id: number,
    newQuestion: Question,
    options: Option[],
  ): Promise<Question> {
    return await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.update(Question, id, newQuestion);
      const existedQuestion = await this.findById(id);

      if (options.length > 0) {
        // 找出这个问题下所有的选项，并删除
        const existedOptions = existedQuestion.options;
        await Promise.all(
          existedOptions.map(async option => {
            await transactionalEntityManager.delete(Option, option.id);
          }),
        );
        await Promise.all(
          options.map(async option => {
            await transactionalEntityManager.save(option);
          }),
        );
      }
      return existedQuestion;
    });
  }

  /**
   * 删除一个问题，会级联删除这个问题下的选项和答案
   * @param id
   */
  async remove(id: number): Promise<number> {
    await this.repository.delete(id);
    return id;
  }
}
