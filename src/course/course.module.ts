import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseEntity } from './entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]), UserModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
