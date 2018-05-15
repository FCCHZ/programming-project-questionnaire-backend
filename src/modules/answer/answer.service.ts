import { Injectable } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';
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

  async save(answers: Answer[]): Promise<boolean> {
    return await getManager().transaction(async transactionalEntityManager => {
      if (answers.length > 0) {
        await Promise.all(
          answers.map(async answer => {
            await transactionalEntityManager.save(answer);
          }),
        );
      }
      return true;
    });
  }
}
