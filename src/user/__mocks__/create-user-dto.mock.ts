import { CreateUserDto } from '../dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { UserType } from '../enum/user-role.enum';

export const CreateUserDtoMock: CreateUserDto = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: faker.helpers.enumValue(UserType),
};
