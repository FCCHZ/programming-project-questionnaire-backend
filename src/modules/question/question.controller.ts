import {
  Controller,
  Query,
  Res,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import httpResult from 'utils/httpResult';
import { QuestionDto } from './question.dto';
import { Question } from './question.entity';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';
import { Option } from '../option/option.entity';
import { OptionDto } from '../option/option.dto';

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
    const options: OptionDto[] = JSON.parse(questionDto.options);
    const questionnaire = await this.surveyService.findById(
      questionDto.questionnaireId,
    );
    const question = new Question();
    question.title = questionDto.title;
    question.type = questionDto.type;
    question.questionnaire = questionnaire;

    const optionArry = options.map(item => {
      const option = new Option();
      option.title = item.title;
      option.value = item.value;
      return option;
    });

    const result = await this.service.save(question, optionArry);
    return httpResult(res, true, '问题保存成功', question);
  }

  @Put('id')
  async modify(@Param() params, @Body() questionDto: QuestionDto, @Res() res) {
    const newQuestion = new Question();
    newQuestion.title = questionDto.title;
    newQuestion.type = questionDto.type;

    const options: OptionDto[] = JSON.parse(questionDto.options);
    const optionArry = options.map(item => {
      const option = new Option();
      option.title = item.title;
      option.value = item.value;
      return option;
    });

    const result = await this.service.update(
      params.id,
      newQuestion,
      optionArry,
    );
    return httpResult(res, true, '修改问题成功', result);
  }

  @Delete(':id')
  async remove(@Param() params, @Res() res) {
    const id = await this.service.remove(params.id);
    return httpResult(res, true, '删除问题成功', id);
  }
}
