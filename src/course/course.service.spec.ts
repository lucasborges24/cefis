import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CourseService } from './course.service';
import { CourseEntity } from './entities/course.entity';
import { CreateCourseMockDto } from './__mocks__/create-course-mock.mock';

describe('CourseService', () => {
  let service: CourseService;
  let userRepository: Repository<UserEntity>;
  let courseRepository: Repository<CourseEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
        {
          provide: getRepositoryToken(CourseEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
            save: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    courseRepository = module.get<Repository<CourseEntity>>(
      getRepositoryToken(CourseEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(courseRepository).toBeDefined();
  });
  describe('create', () => {
    it('should throw NotFoundException if teacher is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.create(CreateCourseMockDto, 1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if course already exists for the teacher', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(new UserEntity());
      jest
        .spyOn(courseRepository, 'findOne')
        .mockResolvedValueOnce(new CourseEntity());

      await expect(service.create(CreateCourseMockDto, 1)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should create a new course for the teacher if valid', async () => {
      const user = new UserEntity();
      const courseData = new CourseEntity();
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(courseRepository, 'findOne').mockResolvedValueOnce(undefined);
      jest.spyOn(courseRepository, 'save').mockResolvedValueOnce({
        ...courseData,
        teacher: user,
      });

      const result = await service.create(
        { title: courseData.title, duration: courseData.duration },
        1,
      );

      expect(result).toEqual({ ...courseData, teacher: user });
      expect(courseRepository.save).toHaveBeenCalledWith({
        ...courseData,
        teacher: user,
      });
    });
  });
});
