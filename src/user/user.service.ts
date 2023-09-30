import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 10;
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const passwordHashed = await bcrypt.hash(
      createUserDto.password,
      this.SALT_ROUNDS,
    );

    return this.usersRepository.save({
      ...createUserDto,
      password: passwordHashed,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.usersRepository.delete(id);
    return;
  }
}
