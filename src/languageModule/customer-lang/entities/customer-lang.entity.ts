import { LanguageDatum } from './../../language-data/entities/language-datum.entity';
import { Assignment } from 'src/assignmentModule/assignment/entities/assignment.entity';
import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(['assignment_id', 'customer_language_id'], { unique: true })
export class CustomerLang {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assignment)
  @JoinColumn({ name: 'assignment_id' })
  assignment_id: number;

  @ManyToOne(() => LanguageDatum)
  @JoinColumn({ name: 'language_id' })
  customer_language_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_date: Date;
}
