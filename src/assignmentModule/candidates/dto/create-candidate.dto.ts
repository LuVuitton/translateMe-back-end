import { IsNumber } from 'class-validator';

export class CreateCandidateDto {
  @IsNumber()
  assignment_id: number;
}
