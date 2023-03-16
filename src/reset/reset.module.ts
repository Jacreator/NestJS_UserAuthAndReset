import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetEntity } from './entities/reset.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ResetController],
  providers: [ResetService],
  imports: [
    TypeOrmModule.forFeature([ResetEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
      },
      defaults: {
        from: 'jambone.james82@gmail.com',
      },
    }),
    AuthModule,
  ],
})
export class ResetModule {}
