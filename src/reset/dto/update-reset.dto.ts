import { PartialType } from '@nestjs/mapped-types';
import { CreateResetDto } from './create-reset.dto';

export class UpdateResetDto extends PartialType(CreateResetDto) {}
