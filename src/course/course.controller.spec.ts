import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { ReturnCourseDto } from './dto/return-course.dto';
import { CourseEntity } from './entities/course.entity';
import { CreateCourseMockDto } from './__mocks__/create-course-mock.mock';

describe('CourseController', () => {
  let controller: CourseController;
  let courseService: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    courseService = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(courseService).toBeDefined();
  });

  describe('create', () => {
    it('should call courseService.create with correct parameters and return a ReturnCourseDto', async () => {
      const course = new CourseEntity();
      const expectedResult = new ReturnCourseDto({
        ...course,
      });

      // spy service mock
      jest.spyOn(courseService, 'create').mockResolvedValue(course);

      const result = await controller.create(CreateCourseMockDto, 1);

      expect(courseService.create).toHaveBeenCalledWith(CreateCourseMockDto, 1);
      expect(result).toBeInstanceOf(ReturnCourseDto);
      expect(result).toEqual(expectedResult);
    });
  });
});
