import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from '../question/question.entity';
import { Answer } from '../answer/answer.entity';

@Entity('option')
export class Option {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column({
    comment: '选项值',
  })
  value: string;

  @ManyToOne(type => Question, question => question.options)
  question: Question;

  @OneToMany(type => Answer, answer => answer.option, {
    cascade: ['remove'],
  })
  answers: Answer[];

  @CreateDateColumn() created_at: string;
  @UpdateDateColumn() updated_at: string;
}
