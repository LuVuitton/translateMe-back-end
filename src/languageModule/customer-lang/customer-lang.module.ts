import { Module } from '@nestjs/common';
import { CustomerLangService } from './customer-lang.service';
import { CustomerLangController } from './customer-lang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerLang } from './entities/customer-lang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerLang])],
  controllers: [CustomerLangController],
  providers: [CustomerLangService],
})
export class CustomerLangModule {}
