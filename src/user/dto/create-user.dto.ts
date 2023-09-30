import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserType } from '../enum/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(131)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(131)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(63)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(63)
  @IsEnum(UserType, {
    message: `Invalid role. Valids roles are ${Object.values(UserType)}`,
  })
  role: string;
}
