import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private coursesRepository: Repository<CourseEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(
    createCourseDto: CreateCourseDto,
    teacherId: number,
  ): Promise<CourseEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: teacherId },
    });

    if (!user) {
      throw new NotFoundException('Teacher not found');
    }

    const course = await this.coursesRepository.findOne({
      where: { title: createCourseDto.title, teacherId: teacherId },
    });

    if (course) {
      throw new ConflictException('Course already exists for this teacher');
    }

    return this.coursesRepository.save({
      ...createCourseDto,
      teacher: user,
    });
  }

  async findAll(limit: number = 10, page: number = 1): Promise<CourseEntity[]> {
    return this.coursesRepository.find({
      relations: ['teacher'],
      take: limit,
      skip: limit * (page - 1),
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    console.log(id, updateCourseDto);
    return `This action updates a #${id} course`;
  }

  async remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
