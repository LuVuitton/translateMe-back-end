import { IsNotEmpty } from 'class-validator';

export class CreateUserContactDto {
  @IsNotEmpty()
  user_id: number;
}
