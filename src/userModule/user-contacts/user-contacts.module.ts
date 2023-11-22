import { Module } from '@nestjs/common';
import { UserContactsService } from './user-contacts.service';
import { UserContactsController } from './user-contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContact } from './entities/user-contact.entity';

import { ContactVisibility } from 'src/contact-visibility/entities/contact-visibility.entity';
import { ContactVisibilityService } from 'src/contact-visibility/contact-visibility.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserContact, ContactVisibility])],
  controllers: [UserContactsController],
  providers: [UserContactsService, ContactVisibilityService],
  // exports: [UserContactsService],
})
export class UserContactsModule {}


