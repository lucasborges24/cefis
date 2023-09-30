import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { authorizationToLoginPayload } from '../utils/base-64-converter';

export const userId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { authorization } = ctx.switchToHttp().getRequest().headers;
    const token = authorization.split(' ')[1] || '';

    const loginPayload = authorizationToLoginPayload(token);

    return loginPayload?.sub;
  },
);
