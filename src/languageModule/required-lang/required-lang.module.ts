import { Module } from '@nestjs/common';
import { RequiredLangService } from './required-lang.service';
import { RequiredLangController } from './required-lang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequiredLang } from './entities/required-lang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequiredLang])],
  controllers: [RequiredLangController],
  providers: [RequiredLangService],
})
export class RequiredLangModule {}
