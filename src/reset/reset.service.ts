import { Injectable } from '@nestjs/common';
import { CreateResetDto } from './dto/create-reset.dto';
import { UpdateResetDto } from './dto/update-reset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResetEntity } from './entities/reset.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ResetService {
  constructor(
    @InjectRepository(ResetEntity)
    private readonly resetRepository: Repository<ResetEntity>,
    private readonly mailerService: MailerService,
  ) {}
  async create(createResetDto: CreateResetDto): Promise<CreateResetDto> {
    const reset = await this.resetRepository.save(createResetDto);

    const url = `http://localhost:3000/api/v1/reset/${reset.token}`;

    await this.mailerService.sendMail({
      to: createResetDto.email,
      subject: `Reset Your Password`,
      html: `Click <a href="${url}">here</a> to reset your password!`,
    });

    return reset;
  }

  findAll() {
    return `This action returns all reset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reset`;
  }

  update(id: number, updateResetDto: UpdateResetDto) {
    return `This action updates a #${id} reset`;
  }

  remove(id: number) {
    return `This action removes a #${id} reset`;
  }
}
