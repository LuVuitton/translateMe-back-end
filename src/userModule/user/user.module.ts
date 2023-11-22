import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserContactsService } from '../user-contacts/user-contacts.service';
import { UserContact } from '../user-contacts/entities/user-contact.entity';
import { ContactVisibility } from 'src/contact-visibility/entities/contact-visibility.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserContact, ContactVisibility])],
  controllers: [UserController],
  providers: [UserService, UserContactsService],
  exports: [UserService],
})
export class UserModule {}
