import { Module } from '@nestjs/common';
import { ContactVisibilityService } from './contact-visibility.service';
import { ContactVisibilityController } from './contact-visibility.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactVisibility } from './entities/contact-visibility.entity';
import { UserContactsService } from 'src/userModule/user-contacts/user-contacts.service';
import { UserContact } from 'src/userModule/user-contacts/entities/user-contact.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ ContactVisibility, UserContact ])],
  controllers: [ContactVisibilityController],
  providers: [ContactVisibilityService, UserContactsService],
  // exports: [ContactVisibilityService],
})
export class ContactVisibilityModule {}


// @Module({
//   imports: [TypeOrmModule.forFeature([User, UserContact])],
//   controllers: [UserController],
//   providers: [UserService, UserContactsService],
//   exports: [UserService],
// })