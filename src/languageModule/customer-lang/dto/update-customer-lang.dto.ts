import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerLangDto } from './create-customer-lang.dto';

export class UpdateCustomerLangDto extends PartialType(CreateCustomerLangDto) {}
