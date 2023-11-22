import { LanguageDatum } from 'src/languageModule/language-data/entities/language-datum.entity';
import { User } from 'src/userModule/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index(['user_id', 'language_id'], { unique: true })
export class UserLang {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => LanguageDatum)
  @JoinColumn({ name: 'language_id' })
  language_id: number;

  @Column()
  proficiency_id: number;
}
