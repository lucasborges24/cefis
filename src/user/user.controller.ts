import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { userId } from '../decorators/user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.create(createUserDto));
  }

  @Get('all')
  async findAll(): Promise<ReturnUserDto[]> {
    return (await this.userService.findAll()).map(
      (UserEntity) => new ReturnUserDto(UserEntity),
    );
  }

  @Get()
  async findOne(@userId() userId: string) {
    return new ReturnUserDto(await this.userService.findUserById(+userId));
  }

  @Patch()
  async update(
    @userId() id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.update(+id, updateUserDto));
  }

  @Delete()
  @HttpCode(204)
  async remove(@userId() id: string) {
    return await this.userService.remove(+id);
  }
}
