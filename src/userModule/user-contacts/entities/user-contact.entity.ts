import { User } from 'src/userModule/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserContact {
  @PrimaryGeneratedColumn()
  user_contact_id:number;

  @PrimaryColumn()
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({nullable:true})
  whatsapp: string;

  @Column({nullable:true})
  telegram: string;

  @Column({nullable:true})
  viber: string;

  @Column({nullable:true})
  phone_number: string;

  @Column({nullable:true})
  instagram: string;

  @Column({ length: 500, nullable:true })
  other_contacts: string;

  @CreateDateColumn({ type: 'timestamp' })
  contact_create_date: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  contact_update_date: Date;
}
