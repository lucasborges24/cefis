import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(131)
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  duration: number;
}
