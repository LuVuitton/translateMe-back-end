import { IsInt, IsNumber, IsString, Length } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  recipient_id: number;

  @IsString()
  @Length(3, 1000)
  review_text: string;
}
