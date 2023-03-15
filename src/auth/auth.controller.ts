import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/RegisterDto';
import { LoginDto } from './dto/LoginDto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async create(@Body() createAuthDto: RegisterDto) {
    if (createAuthDto.password !== createAuthDto.password_confirm) {
      throw new BadRequestException('Password did not match');
    }
    // hash password
    const password = await bcrypt.hash(createAuthDto.password, 10);
    return this.authService.create({
      first_name: createAuthDto.first_name,
      last_name: createAuthDto.last_name,
      email: createAuthDto.email,
      password: password,
      phone_number: createAuthDto.phone_number,
    });
  }

  @Get('/users')
  findAll() {
    return this.authService.findAll();
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });

    //   send res by cookies
    response.cookie('userJWT', await this.authService.sign(user), {
      httpOnly: true,
    });

    return user;
  }
}
