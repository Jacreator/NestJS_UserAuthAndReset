import { IsAlphanumeric, IsDefined, IsEmail, IsNotEmpty } from "class-validator";
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
  @IsAlphanumeric()
  password?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsAlphanumeric()
  password_confirm?: string;
  phone_number?: string;
}
