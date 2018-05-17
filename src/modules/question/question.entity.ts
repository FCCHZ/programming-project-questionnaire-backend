import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Questionnaire } from '../questionnaire/questionnaire.entity';
import { Option } from '../option/option.entity';
import { Answer } from '../answer/answer.entity';

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column('enum', {
    enum: [1, 2, 3],
    comment: '1：单选框；2：复选框；3：输入框',
  })
  type: number;

  @ManyToOne(type => Questionnaire, questionnaire => questionnaire.questions)
  questionnaire: Questionnaire;

  @OneToMany(type => Option, option => option.question, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  options: Option[];

  @OneToMany(type => Answer, answer => answer.question, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  answers: Answer[];

  @Column() order: number;

  @CreateDateColumn() created_at: string;
  @UpdateDateColumn() updated_at: string;
}
