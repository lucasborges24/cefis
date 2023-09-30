import { UserEntity } from '../../user/entities/user.entity';

export class LoginPayloadDto {
  sub: number;
  username: string;

  constructor(user: UserEntity) {
    this.sub = user.id;
    this.username = user.email;
  }
}
