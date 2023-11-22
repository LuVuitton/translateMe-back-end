import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { CustomerLang } from 'src/languageModule/customer-lang/entities/customer-lang.entity';
import { RequiredLang } from 'src/languageModule/required-lang/entities/required-lang.entity';
import { Candidate } from '../candidates/entities/candidate.entity';
import { User } from 'src/userModule/user/entities/user.entity';
import { UserService } from 'src/userModule/user/user.service';
import { UserContactsService } from 'src/userModule/user-contacts/user-contacts.service';
import { UserContact } from 'src/userModule/user-contacts/entities/user-contact.entity';
import { ContactVisibility } from 'src/contact-visibility/entities/contact-visibility.entity';
import { CandidatesService } from '../candidates/candidates.service';
import { ContactVisibilityService } from 'src/contact-visibility/contact-visibility.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Assignment,
      CustomerLang,
      RequiredLang,
      Candidate,
      User, 
      UserContact,
      ContactVisibility,
      Candidate
    ]),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService, ContactVisibilityService, UserService, UserContactsService, CandidatesService],
})
export class AssignmentModule {}
