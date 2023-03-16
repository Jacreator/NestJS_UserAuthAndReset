import { IsAlphanumeric, IsDefined, IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDefined()
  @IsAlphanumeric()
  password: string;
}
