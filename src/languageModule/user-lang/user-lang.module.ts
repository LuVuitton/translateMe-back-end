import { Module } from '@nestjs/common';
import { UserLangService } from './user-lang.service';
import { UserLangController } from './user-lang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLang } from './entities/user-lang.entity';
import { User } from 'src/userModule/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLang, User])],
  controllers: [UserLangController],
  providers: [UserLangService],
})
export class UserLangModule {}
