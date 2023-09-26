import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()], // 👈 import the ConfigModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
