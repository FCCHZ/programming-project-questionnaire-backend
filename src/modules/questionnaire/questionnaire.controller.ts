import {
  Controller,
  Get,
  Param,
  Res,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import httpResult from '../../utils/httpResult';
import { QuestionnaireDto } from './questionnaire.dto';
import { Questionnaire } from './questionnaire.entity';
import { ApiImplicitParam, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('问卷')
@Controller('survey')
export class QuestionnaireController {
  constructor(private readonly service: QuestionnaireService) {}

  @Get()
  async fetchSurveyWithPaginatin(@Query() query, @Res() res) {
    const { page, pageSize } = query;
    const result = await this.service.pagination(page, pageSize);
    return httpResult(res, true, '问卷列表数据返回成功', {
      page: +page,
      pageSize: +pageSize,
      list: result[0],
      total: result[1],
    });
  }

  @Post()
  async save(@Body() questionnaireDto: QuestionnaireDto, @Res() res) {
    const questionnaire = new Questionnaire();
    questionnaire.title = questionnaireDto.title;
    questionnaire.content = questionnaireDto.content;
    questionnaire.deadline = questionnaireDto.deadline;

    const result = await this.service.save(questionnaire);
    return httpResult(res, true, '问卷保存成功', result);
  }

  @ApiImplicitParam({ name: 'id' })
  @Get(':id')
  async findById(@Param() params, @Res() res) {
    const questionnaire = await this.service.findById(params.id);
    return httpResult(res, true, '问卷查询成功', questionnaire);
  }

  @ApiImplicitParam({ name: 'id' })
  @Put(':id')
  async modify(
    @Param() params,
    @Body() questionnaireDto: QuestionnaireDto,
    @Res() res,
  ) {
    const id = params.id;
    const questionnaire = await this.service.findById(id);
    questionnaire.title = questionnaireDto.title;
    questionnaire.content = questionnaireDto.content;
    questionnaire.deadline = questionnaireDto.deadline;

    const result = await this.service.update(id, questionnaire);
    return httpResult(res, true, '问卷修改成功', result);
  }

  @ApiImplicitParam({ name: 'id' })
  @Delete(':id')
  async remove(@Param() params, @Res() res) {
    const id = await this.service.remove(params.id);
    return httpResult(res, true, '问卷删除成功', id);
  }

  @ApiImplicitParam({ name: 'id' })
  @Get('online/:id')
  async online(@Param() params, @Res() res) {
    const result = await this.service.online(params.id);
    return httpResult(res, true, '新闻发布成功', result);
  }

  @ApiImplicitParam({ name: 'id' })
  @Get('offline/:id')
  async offline(@Param() params, @Res() res) {
    const result = await this.service.offline(params.id);
    return httpResult(res, true, '新闻下线成功', result);
  }
}
