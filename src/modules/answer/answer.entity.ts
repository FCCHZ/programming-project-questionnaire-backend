import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Question } from '../question/question.entity';

@Entity('answer')
export class Answer {
  @PrimaryGeneratedColumn() id: number;

  @Column() answer: string;

  @ManyToOne(type => Question, question => question.answers, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  question: Question;

  @CreateDateColumn() created_at: string;
  @UpdateDateColumn() updated_at: string;
}
