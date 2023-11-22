import { Type } from 'class-transformer';
import { User } from '../../../userModule/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  assignment_id: number;

  @Column({ nullable: true })
  worth: number;

  @Column({ default: 1 })
  assignment_status: 1 | 2 | 3 | 4 | 5;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer_id: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'executor_id' })
  executor_id: number;

  @Column()
  address: string; //adress

  @Column()
  assignment_date: string 


  @Column()
  country_id: number;

  @Column()
  city_id: number;

  @Column()
  assignment_title: string;

  @Column({ length: 1000 })
  assignment_description: string;

  @Column()
  execution_time_minutes: number;

  @Column({ default: null })
  executor_rating_by_customer: number;

  @Column({ default: null })
  customer_rating_by_executor: number;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn({ type: 'timestamp' })
  assignment_creation_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  assignment_update_date: Date;
}
