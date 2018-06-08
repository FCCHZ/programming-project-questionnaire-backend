import { ApiModelProperty } from '@nestjs/swagger';

export class QuestionnaireDto {
  @ApiModelProperty({
    description: '问卷标题',
  })
  title: string;
  @ApiModelProperty({
    description: '问卷内容',
  })
  content: string;
  @ApiModelProperty({
    description: '问卷截止时间',
  })
  deadline: string;
  @ApiModelProperty({
    description: '问卷状态',
    required: false,
  })
  status: string;
}
