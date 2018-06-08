import { ApiModelProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiModelProperty({
    description: '问题的文本',
  })
  title: string;
  @ApiModelProperty({
    description: '问题的类型',
  })
  type: string;
  @ApiModelProperty({
    description: '问题所在的问卷ID',
  })
  questionnaireId: string;
  @ApiModelProperty({
    description: '问题下的选项（数组）stringfy之后的字符串',
  })
  options: string;
}
