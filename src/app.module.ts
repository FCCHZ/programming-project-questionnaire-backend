import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { QuestionnaireModule } from 'modules/questionnaire/questionnaire.module';
import { QuestionModule } from 'modules/question/question.module';
import { OptionModule } from 'modules/option/option.module';
import { AnswerModule } from 'modules/answer/answer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    QuestionnaireModule,
    QuestionModule,
    OptionModule,
    AnswerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
