import { ApiModelProperty } from '@nestjs/swagger';

export class OptionDto {
  @ApiModelProperty({
    description: '问题选项文本',
  })
  title: string;
  @ApiModelProperty({
    description: '问题选项值',
  })
  value: string;
  @ApiModelProperty({
    description: '问题选项对应的问题ID',
  })
  questionId: string;
}
