import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly repository: Repository<Questionnaire>,
  ) {}
}
