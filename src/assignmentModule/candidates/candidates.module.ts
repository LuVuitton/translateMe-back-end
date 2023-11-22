import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { Candidate } from './entities/candidate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/userModule/user/entities/user.entity';
import { Assignment } from '../assignment/entities/assignment.entity';
import { ContactVisibilityService } from 'src/contact-visibility/contact-visibility.service';
import { ContactVisibility } from 'src/contact-visibility/entities/contact-visibility.entity';
import { UserContactsService } from 'src/userModule/user-contacts/user-contacts.service';
import { UserContact } from 'src/userModule/user-contacts/entities/user-contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, User, Assignment, ContactVisibility, UserContact])],
  controllers: [CandidatesController],
  providers: [CandidatesService, ContactVisibilityService, UserContactsService],
})
export class CandidatesModule {}
