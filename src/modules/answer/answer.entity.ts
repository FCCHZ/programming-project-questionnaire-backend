import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Option } from '../option/option.entity';

@Entity('answer')
export class Answer {
  @PrimaryGeneratedColumn() id: number;

  @Column() answer: string;

  @ManyToOne(type => Option, option => option.answers)
  option: Option;

  @CreateDateColumn() created_at: string;
  @UpdateDateColumn() updated_at: string;
}
