import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;
}
