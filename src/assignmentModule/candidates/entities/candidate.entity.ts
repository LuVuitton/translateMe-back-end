import { Assignment } from 'src/assignmentModule/assignment/entities/assignment.entity';
import { User } from 'src/userModule/user/entities/user.entity';
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
@Index(['user_id', 'assignment_id'], { unique: true })
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Assignment)
  @JoinColumn({ name: 'assignment_id' })
  assignment_id: number;


  @CreateDateColumn({ type: 'timestamp' })
  candidate_creation_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  candidate_update_date: Date;
}
