import { Controller, Query, Res, Get, Param, Post, Body } from '@nestjs/common';
import { QuestionService } from './question.service';
import httpResult from 'utils/httpResult';
import { QuestionDto } from './question.dto';
import { Question } from './question.entity';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly service: QuestionService,
    private readonly surveyService: QuestionnaireService,
  ) {}

  @Get()
  async findAll(@Query() query, @Res() res) {
    const result = await this.service.findAll(query.surveyId);
    return httpResult(res, true, '问题返回成功', result);
  }

  @Get(':id')
  async findById(@Param() params, @Res() res) {
    const question = await this.service.findById(params.id);
    return httpResult(res, true, '问题查询成功', question);
  }

  @Post()
  async save(@Body() questionDto: QuestionDto, @Res() res) {
    const surveyId = questionDto.questionnaireId;
    const questionnaire = await this.surveyService.findById(
      questionDto.questionnaireId,
    );
    const question = new Question();
    question.title = questionDto.title;
    question.type = questionDto.type;
    question.questionnaire = questionnaire;

    const result = await this.service.save(question);
    return httpResult(res, true, '问题保存成功', question);
  }
}
