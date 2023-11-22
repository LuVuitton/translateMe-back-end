import { IsNotEmpty, IsNumber } from 'class-validator';

export class PickCandidateDto {
  @IsNotEmpty()
  @IsNumber()
  assignment_id: number;

  @IsNotEmpty()
  @IsNumber()
  candidate_id: number;
}
