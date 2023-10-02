import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { userId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-role.enum';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ReturnAllCoursesDto } from './dto/return-all-courses.dto';
import { ReturnCourseDto } from './dto/return-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(UserType.Teacher)
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @userId() teacherId: number,
  ) {
    return new ReturnCourseDto(
      await this.courseService.create(createCourseDto, teacherId),
    );
  }

  @Get()
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    const data = (await this.courseService.findAll(limit, page)).map(
      (CourseEntity) => new ReturnAllCoursesDto(CourseEntity),
    );
    return {
      page,
      limit,
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @userId() teacherId: number,
  ) {
    return this.courseService.update(+id, updateCourseDto, teacherId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @userId() teacherId: number) {
    return this.courseService.remove(+id, teacherId);
  }
}
