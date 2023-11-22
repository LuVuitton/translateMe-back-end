import {
  IsNumber,
  IsOptional,
  Max,
  Min,
  IsNotEmpty,
  IsString,
  Length,
  ArrayNotEmpty,
  IsArray,
  // IsDate,
  IsDateString
} from 'class-validator';

export class CreateAssignmentDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10000)
  worth: number | null;

  // @IsNotEmpty()
  // @IsNumber()
  // customer_id: number;

 

  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  address: string; //adress

  @IsNotEmpty()
  // @IsString()
  @IsDateString()
  assignment_date: string ;

  @IsNotEmpty()
  @IsNumber()
  country_id: number;

  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @IsArray({
    message: 'The required_languages_id should be an array of numbers',
  })
  @ArrayNotEmpty()
  required_languages_id: number[];

  @IsNotEmpty()
  @IsArray({
    message: 'The client_languages_id should be an array of numbers',
  })
  @ArrayNotEmpty()
  customer_languages_id: number[];

  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  assignment_title: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 1000)
  assignment_description: string;

  @IsNotEmpty()
  @IsNumber()
  execution_time_minutes: number;
}
