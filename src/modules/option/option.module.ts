import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './option.entity';
import { OptionService } from './option.service';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
