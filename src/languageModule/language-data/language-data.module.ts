import { Module } from '@nestjs/common';
import { LanguageDataService } from './language-data.service';
import { LanguageDataController } from './language-data.controller';
import { LanguageDatum } from './entities/language-datum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageDatum])],
  controllers: [LanguageDataController],
  providers: [LanguageDataService],
})
export class LanguageDataModule {}
