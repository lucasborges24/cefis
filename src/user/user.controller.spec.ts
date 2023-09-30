import { Test, TestingModule } from '@nestjs/testing';
import { ReturnUserDto } from './dto/return-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDtoMock } from './__mocks__/create-user-dto.mock';
import { userEntityMock } from './__mocks__/user.mock';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(userEntityMock),
            findAll: jest.fn().mockResolvedValue([userEntityMock]),
            findUserById: jest.fn().mockResolvedValue(userEntityMock),
            update: jest.fn().mockResolvedValue(userEntityMock),
            remove: jest.fn().mockResolvedValue(''),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(userService, 'create').mockResolvedValueOnce(userEntityMock);
      const result = await controller.create(CreateUserDtoMock);

      expect(result).toEqual(new ReturnUserDto(userEntityMock));
      expect(userService.create).toHaveBeenCalledWith(CreateUserDtoMock);
      expect(userService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(userService, 'findAll')
        .mockResolvedValueOnce([userEntityMock]);
      const result = await controller.findAll();

      expect(result).toEqual([new ReturnUserDto(userEntityMock)]);
      expect(userService.findAll).toHaveBeenCalledWith();
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest
        .spyOn(userService, 'findUserById')
        .mockResolvedValueOnce(userEntityMock);
      const result = await controller.findOne('1');

      expect(result).toEqual(new ReturnUserDto(userEntityMock));
      expect(userService.findUserById).toHaveBeenCalledWith(1);
      expect(userService.findUserById).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      jest.spyOn(userService, 'update').mockResolvedValueOnce(userEntityMock);
      const result = await controller.update('1', CreateUserDtoMock);

      expect(result).toEqual(new ReturnUserDto(userEntityMock));
      expect(userService.update).toHaveBeenCalledWith(1, CreateUserDtoMock);
      expect(userService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(userService, 'remove').mockResolvedValueOnce();
      const result = await controller.remove('1');

      expect(result).toEqual(undefined);
      expect(userService.remove).toHaveBeenCalledWith(1);
      expect(userService.remove).toHaveBeenCalledTimes(1);
    });
  });
});
