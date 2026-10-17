import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule,ConfigService} from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
port: configService.get<number>('database.port'),
username: configService.get<string>('database.username'),
password: configService.get<string>('database.password'),
database: configService.get<string>('database.database'),
      
        synchronize:false,
        autoLoadEntities: true,
       
      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
