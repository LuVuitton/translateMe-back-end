import { User } from 'src/userModule/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer_id;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'recipient_id' })
  recipient_id;

  @Column({length:1000})
  review_text: string;

  @CreateDateColumn({ type: 'timestamp' })
  review_creation_date: Date;
}
