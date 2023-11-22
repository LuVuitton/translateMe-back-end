import { IsNotEmpty } from 'class-validator';
// import { User } from 'src/userModule/user/entities/user.entity';

export class DeleteUserLangDto {
  @IsNotEmpty({ message: 'language_id is required' })
  language_id: number;
}
