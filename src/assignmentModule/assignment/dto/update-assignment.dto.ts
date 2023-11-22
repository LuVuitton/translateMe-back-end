import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignmentDto } from './create-assignment.dto';
import { IsNumber, Min, Max, IsOptional } from 'class-validator';

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  assignment_status: 1 | 2 | 3 | 4 | 5;

  @IsOptional()
  @IsNumber()
  assignment_id: number

  @IsOptional()
  @IsNumber()
  executor_rating_by_customer: number | null;

  @IsOptional()
  @IsNumber()
  customer_rating_by_executor: number | null;

  @IsOptional()
  @IsNumber()
  candidate_id: number;
}
