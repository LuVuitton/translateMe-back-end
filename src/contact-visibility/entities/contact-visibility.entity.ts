import { UserContact } from 'src/userModule/user-contacts/entities/user-contact.entity';
import { User } from 'src/userModule/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// @Index(['user_id', 'assignment_id'], { unique: true })
@Entity()
export class ContactVisibility {
  @PrimaryGeneratedColumn()
  visibility_id: number;


  @ManyToOne(() => User)
  @JoinColumn({ name: 'viewer_id' })
  viewer_id: number;

  // @ManyToOne(() => UserContact)
  // @JoinColumn({name: "user_contact_id"})
  @Column()
  contact_id: number;



  @CreateDateColumn({ type: 'timestamp' })
  contact_visibility_creation_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  contact_visibility_update_date: Date;
}
