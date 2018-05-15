import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './option.entity';
import { OptionService } from './option.service';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([Option]), QuestionModule],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
