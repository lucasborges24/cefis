import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityMock } from '../user/__mocks__/user.mock';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnLoginDto } from './dtos/return-login.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const userServiceMock = {
      findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
    };

    const jwtServiceMock = {
      sign: jest.fn().mockReturnValue('testToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('login', () => {
    it('should return a token and a user if the login is successful', async () => {
      const result: ReturnLoginDto = await service.login({
        email: userEntityMock.email,
        password: 'Janeiro01!',
      });
      expect(result).toBeDefined();
      expect(result.accessToken).toEqual('testToken');
      expect(result.user).toBeDefined();
    });

    it('should throw an UnauthorizedException if the email is incorrect', async () => {
      const loginDto = new LoginDto();
      loginDto.email = 'test@test.com';
      loginDto.password = 'testPassword';

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an UnauthorizedException if the password is incorrect', async () => {
      const loginDto = new LoginDto();
      loginDto.email = 'test@test.com';
      loginDto.password = 'testPassword';

      const user = new UserEntity();
      user.password = '$2b$10$IncorrectPasswordHash';

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
