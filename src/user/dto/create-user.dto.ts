import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

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
  role: string;
}
