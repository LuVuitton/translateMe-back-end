import { Type } from 'class-transformer';
import { IsOptional, Max, Min, IsArray, IsInt, IsIn } from 'class-validator';

export class SortedAssignmentDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(10)
  @Max(50)
  limit?: number;

  @IsOptional()
  @IsIn(['city', 'country'], {
    message: 'location must be "city" or "country"',
  })
  location?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  location_id?: number;

  @IsArray()
  @IsOptional()
  matchinglang?: number[];
}
