import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { Option } from '../option/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Option]), QuestionnaireModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
