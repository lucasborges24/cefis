import { UserEntity } from '../../user/entities/user.entity';

export class LoginPayloadDto {
  sub: number;
  username: string;
  role: string;

  constructor(user: UserEntity) {
    this.sub = user.id;
    this.username = user.email;
    this.role = user.role;
  }
}
