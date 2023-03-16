import { PartialType } from '@nestjs/mapped-types';
import { CreateResetDto } from './create-reset.dto';
import { IsAlphanumeric, IsDefined, IsNotEmpty } from "class-validator";

export class UpdateResetDto extends PartialType(CreateResetDto) {
  @IsNotEmpty()
  @IsDefined()
  @IsAlphanumeric()
  password: string;
  @IsNotEmpty()
  @IsDefined()
  @IsAlphanumeric()
  password_confirm: string;

  @IsNotEmpty()
  @IsDefined()
  token?: string;
}
