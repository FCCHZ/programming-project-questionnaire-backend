import { Controller } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';

@Controller('survey')
export class QuestionnaireController {
  constructor(private readonly service: QuestionnaireService) {}
}
