import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { userEntityMock } from './__mocks__/user.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(userEntityMock),
            find: jest.fn().mockResolvedValue([userEntityMock]),
            save: jest.fn().mockResolvedValue(userEntityMock),
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            delete: jest.fn().mockResolvedValue(null),
            update: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      const result = await service.create(userEntityMock);

      expect(result).toEqual(userEntityMock);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if user already exists', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(userEntityMock);
      await expect(service.create(userEntityMock)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();

      expect(result).toEqual([userEntityMock]);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if no users are found', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce([]);
      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findUserById', () => {
    it('should return a user', async () => {
      const result = await service.findUserById(1);

      expect(result).toEqual(userEntityMock);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if no user is found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findUserById(1)).rejects.toThrowError();
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user', async () => {
      const result = await service.findUserByEmail(userEntityMock.email);

      expect(result).toEqual(userEntityMock);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if no user is found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(
        service.findUserByEmail(userEntityMock.email),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const result = await service.update(1, userEntityMock);

      expect(result).toEqual(userEntityMock);
      expect(userRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await service.remove(1);

      expect(result).toEqual(undefined);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if no user is found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.remove(1)).rejects.toThrowError();
    });
  });
});
