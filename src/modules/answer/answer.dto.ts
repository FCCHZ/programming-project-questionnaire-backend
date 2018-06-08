import { ApiModelProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiModelProperty({
    description: '答案数组stringfy之后的字符串',
  })
  answers: string;
}
