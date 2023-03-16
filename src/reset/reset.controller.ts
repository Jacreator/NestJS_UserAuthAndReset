import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResetService } from './reset.service';
import { CreateResetDto } from './dto/create-reset.dto';
import { UpdateResetDto } from './dto/update-reset.dto';

@Controller('reset')
export class ResetController {
  constructor(
    private readonly resetService: ResetService,

  ) {}

  @Post('/forgot')
  async create(@Body() createResetDto: CreateResetDto) {
    createResetDto.token = Math.random().toString(36).substring(2, 50);
    return await this.resetService.create(createResetDto);
  }

  @Get()
  findAll() {
    return this.resetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResetDto: UpdateResetDto) {
    return this.resetService.update(+id, updateResetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resetService.remove(+id);
  }
}
