import { LanguageDatum } from 'src/languageModule/language-data/entities/language-datum.entity';
import { Assignment } from '../../../assignmentModule/assignment/entities/assignment.entity';
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
@Index(['assignment_id', 'required_language_id'], { unique: true })
export class RequiredLang {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assignment)
  @JoinColumn({ name: 'assignment_id' })
  assignment_id: number;

  @ManyToOne(() => LanguageDatum)
  @JoinColumn({ name: 'language_id' })
  required_language_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_date: Date;
}
