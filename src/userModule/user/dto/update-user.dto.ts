import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsNumber, Min, Max, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  user_photo: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(200)
  country_id: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(200)
  city_id: number;


  @IsOptional()
  @IsString()
  @Length(3,1000)
  about_me: string;
}
