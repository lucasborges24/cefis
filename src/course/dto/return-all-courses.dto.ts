import { CourseEntity } from '../entities/course.entity';

export class ReturnAllCoursesDto {
  id: number;
  title: string;
  duration: number;
  teacher: string;

  constructor(course: CourseEntity) {
    this.id = course.id;
    this.title = course.title;
    this.duration = course.duration;
    this.teacher = course.teacher ? course.teacher.name : '';
  }
}
