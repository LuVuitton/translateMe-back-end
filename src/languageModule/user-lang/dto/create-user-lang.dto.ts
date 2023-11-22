import { IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateUserLangDto {
  // @IsNotEmpty({ message: 'user_id is required' })
  // user_id: number;

  @IsArray({
    message:
      'The languages array should be in the format [[language_id, proficiency_id], ...]',
  })
  @ArrayNotEmpty()
  languages: [number, 1 | 2 | 3];
}
