import { UserContact } from './userModule/user-contacts/entities/user-contact.entity';
import { Assignment } from './assignmentModule/assignment/entities/assignment.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './userModule/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentModule } from './assignmentModule/assignment/assignment.module';
import { User } from './userModule/user/entities/user.entity';
import { CustomerLang } from './languageModule/customer-lang/entities/customer-lang.entity';
import { RequiredLang } from './languageModule/required-lang/entities/required-lang.entity';
import { UserLang } from './languageModule/user-lang/entities/user-lang.entity';
import { UserContactsModule } from './userModule/user-contacts/user-contacts.module';
import { RequiredLangModule } from './languageModule/required-lang/required-lang.module';
import { CustomerLangModule } from './languageModule/customer-lang/customer-lang.module';
import { UserLangModule } from './languageModule/user-lang/user-lang.module';
import { LanguageDataModule } from './languageModule/language-data/language-data.module';
import { LanguageDatum } from './languageModule/language-data/entities/language-datum.entity';
import { CandidatesModule } from './assignmentModule/candidates/candidates.module';
import { Candidate } from './assignmentModule/candidates/entities/candidate.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/entities/review.entity';
import { AuthModule } from './auth/auth.module';
import { ContactVisibilityModule } from './contact-visibility/contact-visibility.module';
import { ContactVisibility } from './contact-visibility/entities/contact-visibility.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'near',
      entities: [
        User,
        Assignment,
        UserContact,
        CustomerLang,
        RequiredLang,
        UserLang,
        LanguageDatum,
        Candidate,
        Review,
        ContactVisibility,
      ],
      synchronize: true, //Настройка synchronize: true не должна использоваться на продакшене, чтобы вы не потеряли данные.
    }),
    UserModule,
    AssignmentModule,
    UserContactsModule,
    RequiredLangModule,
    CustomerLangModule,
    UserLangModule,
    LanguageDataModule,
    CandidatesModule,
    ReviewsModule,
    AuthModule,
    ContactVisibilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
