import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/LoginDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto): Promise<CreateAuthDto> {
    // @ts-ignore
    return await this.userRepository.save(createAuthDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(condition): Promise<UserEntity> {
    return this.userRepository.findOne({ where: condition });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(condition: LoginDto): Promise<UserEntity> {
    const user = await this.findOne({ email: condition.email });
    if (!user) {
      throw new BadRequestException('Email Does not exist');
    }

    if (!(await bcrypt.compare(condition.password, user.password))) {
      throw new BadRequestException('Invalid Password provided');
    }
    return user;
  }

  async sign(user: UserEntity): Promise<string> {
    return this.jwtService.signAsync({ id: user.id });
  }
}
