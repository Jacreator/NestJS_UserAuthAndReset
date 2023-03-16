import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateResetDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email?: string;
  token?: string;
}
