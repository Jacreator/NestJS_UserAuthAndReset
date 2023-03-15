import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
})
export class AuthModule {}
