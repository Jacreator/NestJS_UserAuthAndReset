import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
import { Unique } from "typeorm";

export class RegisterDto {
  @IsNotEmpty()
  @IsDefined()
  first_name?: string;

  @IsNotEmpty()
  @IsDefined()
  last_name?: string;

  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email?: string;

  @IsDefined()
  @IsNotEmpty()
  password?: string;
  password_confirm?: string;
  phone_number?: string;
}
