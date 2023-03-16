import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResetDto } from './dto/create-reset.dto';
import { UpdateResetDto } from './dto/update-reset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetEntity } from './entities/reset.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetService {
  constructor(
    @InjectRepository(ResetEntity)
    private readonly resetRepository: Repository<ResetEntity>,
    private readonly mailerService: MailerService,
    private readonly authService: AuthService,
  ) {}
  async create(createResetDto: CreateResetDto): Promise<CreateResetDto> {
    createResetDto.token = Math.random().toString(36).substring(2, 50);
    const reset = await this.resetRepository.save(createResetDto);

    const url = `http://localhost:3000/api/v1/reset/${reset.token}`;

    await this.mailerService.sendMail({
      to: createResetDto.email,
      subject: `Reset Your Password`,
      html: `Click <a href="${url}">here</a> to reset your password!`,
    });

    return reset;
  }

  async resetPassword(updateResetDto: UpdateResetDto) {
    const resetInfo = await this.findOne({ token: updateResetDto.token });

    const userDetail = await this.authService.findOne({
      email: updateResetDto.email,
    });

    if (!userDetail) {
      throw new NotFoundException('User not found');
    }

    const passwordHash = await this.authService.hashPassword(
      updateResetDto.password,
    );

    const updateUserDetail = await this.authService.update(userDetail.id, {
      password: updateResetDto.password,
    });

    return updateUserDetail;
  }

  findAll() {
    return `This action returns all reset`;
  }

  async findOne(condition) {
    return await this.resetRepository.findOne({ where: condition });
  }

  update(id: number, updateResetDto: UpdateResetDto) {
    return `This action updates a #${id} reset`;
  }

  remove(id: number) {
    return `This action removes a #${id} reset`;
  }
}
