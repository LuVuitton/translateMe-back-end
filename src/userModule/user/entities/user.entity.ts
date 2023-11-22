import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column({ length: 1000, nullable: true })
  about_me: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  user_photo: string;

  @Column({ nullable: true })
  country_id: number;

  @Column({ nullable: true })
  city_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  user_registration_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  user_update_date: Date;
}
