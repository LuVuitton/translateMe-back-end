import { IsNumber } from 'class-validator';

export class CreateCustomerLangDto {
  @IsNumber()
  assignment_id: number;

  @IsNumber()
  customer_language_id: number;
}
