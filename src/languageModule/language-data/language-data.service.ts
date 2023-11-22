import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LanguageDatum } from './entities/language-datum.entity';

@Injectable()
export class LanguageDataService {
  constructor(
    @InjectRepository(LanguageDatum)
    private languageDatumRepository: Repository<LanguageDatum>,
  ) {}
}
