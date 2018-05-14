import { Controller, Get, Param, Res, Query } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import httpResult from 'utils/httpResult';

@Controller('survey')
export class QuestionnaireController {
  constructor(private readonly service: QuestionnaireService) {}

  @Get('/pagination')
  async fetchSurveyWithPaginatin(@Query() query, @Res() res) {
    const { page, pageSize } = query;
    const result = await this.service.pagination(page, pageSize);
    return httpResult(res, true, '问卷列表数据返回成功', {
      page,
      pageSize,
      list: result[0],
      total: result[1],
    });
  }
}
