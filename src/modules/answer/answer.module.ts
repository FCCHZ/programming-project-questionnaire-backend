import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { AnswerService } from './answer.service';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), QuestionModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
