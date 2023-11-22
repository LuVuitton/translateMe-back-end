import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @Length(3, 40)
  @IsNotEmpty()
  full_name: string;

  @IsEmail({ allow_display_name: true })
  email: string;

  @Length(6, 100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain a digit, uppercase and lowercase letters, and must not have newline characters.',
  })
  password: string;
}
