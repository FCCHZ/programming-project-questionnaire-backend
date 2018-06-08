import { Controller, Post, Body, Res } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerDto } from './answer.dto';
import { Answer } from './answer.entity';
import { QuestionService } from '../question/question.service';
import httpResult from '../../utils/httpResult';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('答案')
@Controller('answer')
export class AnswerController {
  constructor(
    private readonly service: AnswerService,
    private readonly questionService: QuestionService,
  ) {}

  @Post()
  async saveAnswers(@Body() body: AnswerDto, @Res() res) {
    const answerDtoArry: any[] = JSON.parse(body.answers);
    const answerArry = await Promise.all(
      answerDtoArry.map(async item => {
        const answer = new Answer();
        answer.answer = item.answer;
        const question = await this.questionService.findById(+item.questionId);
        answer.question = question;
        return answer;
      }),
    );
    const result = this.service.save(answerArry);
    return httpResult(res, true, '答案提交成功', result);
  }
}
