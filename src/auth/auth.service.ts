import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { ReturnUserDto } from '../user/dto/return-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from './dtos/login-payload.dto';
import { ReturnLoginDto } from './dtos/return-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);
    const passwordMatch = await compare(
      loginDto.password,
      user?.password || '',
    );
    if (!user || !passwordMatch) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDto(user) }),

      user: new ReturnUserDto(user),
    };
  }
}
