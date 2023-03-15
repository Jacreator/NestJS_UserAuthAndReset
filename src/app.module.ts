import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import { DatabaseType } from 'typeorm';

const mySQLDatabase: DatabaseType = 'mysql';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: mySQLDatabase,
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.name,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
