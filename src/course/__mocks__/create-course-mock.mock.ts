import { faker } from '@faker-js/faker';

export const CreateCourseMockDto = {
  title: faker.lorem.sentence(3),
  duration: faker.number.int(0),
};
