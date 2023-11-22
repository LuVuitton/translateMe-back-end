import { Injectable } from '@nestjs/common';
import { CreateCustomerLangDto } from './dto/create-customer-lang.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerLang } from './entities/customer-lang.entity';

@Injectable()
export class CustomerLangService {
  constructor(
    @InjectRepository(CustomerLang)
    private сustomerLangRepository: Repository<CustomerLang>,
  ) {}

  async getByAssignmentId({ assigment_id }: { assigment_id: number }) {
    const сustomerLangs: any = await this.сustomerLangRepository
      .createQueryBuilder('cl')
      .where('cl.assignment_id = :assigment_id', { assigment_id })
      .leftJoinAndSelect('cl.assignment_id', 'a')
      .leftJoinAndSelect('cl.customer_language_id', 'languageDatum')
      .getMany();


    const totalLanguages = сustomerLangs.length;

    const languages = сustomerLangs.map((item) => {
      return {
        item_id: item.id,
        language_id: item.customer_language_id.language_id,
        language_name: item.customer_language_id.language_name,
      };
    });

    const assignment_id = сustomerLangs[0].assignment_id.assignment_id;

    return {
      assignment_id,
      totalLanguages,
      сustomer_languages: languages,
    };
  }
}
