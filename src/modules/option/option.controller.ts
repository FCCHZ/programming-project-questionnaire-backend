import { Controller, Put, Param, Res, Body, Delete } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionDto } from './option.dto';
import { Option } from './option.entity';
import { QuestionService } from '../question/question.service';
import httpResult from '../../utils/httpResult';

@Controller('option')
export class OptionController {
  constructor(
    private readonly service: OptionService,
    private readonly questionService: QuestionService,
  ) {}

  @Put(':id')
  async modify(@Param() params, @Body() optionDto: OptionDto, @Res() res) {
    const question = await this.questionService.findById(+optionDto.questionId);
    const option = new Option();
    option.title = optionDto.title;
    option.value = optionDto.value;
    option.question = question;

    const result = await this.service.update(params.id, option);
    return httpResult(res, true, '修改选项成功', result);
  }

  @Delete(':id')
  async remove(@Param() params, @Res() res) {
    const id = await this.service.remove(params.id);
    return httpResult(res, true, '删除选项成功', id);
  }
}
