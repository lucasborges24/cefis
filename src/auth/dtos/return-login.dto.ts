import { ReturnUserDto } from '../../user/dto/return-user.dto';

export interface ReturnLoginDto {
  accessToken: string;
  user: ReturnUserDto;
}
