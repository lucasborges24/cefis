import { ReturnUserDto } from '../../user/dto/return-user.dto';
import { CourseEntity } from '../entities/course.entity';

export class ReturnCourseDto {
  id: number;
  title: string;
  duration: number;
  teacher?: ReturnUserDto;

  constructor(course: CourseEntity) {
    this.id = course.id;
    this.title = course.title;
    this.duration = course.duration;
    this.teacher = course.teacher
      ? new ReturnUserDto(course.teacher)
      : undefined;
  }
}
