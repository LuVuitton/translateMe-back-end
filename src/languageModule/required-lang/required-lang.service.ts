import { Injectable } from '@nestjs/common';
import { CreateRequiredLangDto } from './dto/create-required-lang.dto';
import { UpdateRequiredLangDto } from './dto/update-required-lang.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequiredLang } from './entities/required-lang.entity';

@Injectable()
export class RequiredLangService {
  constructor(
    @InjectRepository(RequiredLang)
    private requiredLangRepository: Repository<RequiredLang>,
  ) {}


  async getByAssignmentId({ assigment_id }: { assigment_id: number }) {
    const requiredLangs: any = await this.requiredLangRepository
      .createQueryBuilder('cl')
      .where('cl.assignment_id = :assigment_id', { assigment_id })
      .leftJoinAndSelect('cl.assignment_id', 'a')
      .leftJoinAndSelect('cl.required_language_id', 'languageDatum')
      .getMany();

      console.log(requiredLangs);
      


    const totalLanguages = requiredLangs.length;

    const languages = requiredLangs.map((item) => {
      return {
        item_id: item.id,
        language_id: item.required_language_id.language_id,
        language_name: item.required_language_id.language_name,
      };
    });

    const assignment_id = requiredLangs[0].assignment_id.assignment_id;

    return {
      assignment_id,
      totalLanguages,
      required_languages: languages,
    };
  }
}
