import { UserEntity } from '../entities/user.entity';
import { faker } from '@faker-js/faker';
import { UserType } from '../enum/user-role.enum';

export const userEntityMock: UserEntity = {
  id: faker.number.int({ min: 1 }),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.enumValue(UserType),
  password: '$2b$10$1YhW7CQPShUmYwYFnh/.6O.X0lWM.tTONAlHZPtoYVAKo24RphkZ2',
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
};
