import { IsOptional, IsString, Length,  } from 'class-validator';

export class UpdateUserContactDto {

  @IsOptional()
  @IsString()
  @Length(3, 255)
  whatsapp?: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  telegram?: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  viber?: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  phone_number?: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  instagram?: string;

  @IsOptional()
  @IsString()
  @Length(3, 500)
  other_contacts?: string;
}