import { LoginPayloadDto } from 'src/auth/dtos/login-payload.dto';

export const authorizationToLoginPayload = (
  token: string,
): LoginPayloadDto | undefined => {
  const authorizationSplited = token.split('.');

  if (authorizationSplited.length !== 3 || !authorizationSplited[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authorizationSplited[1], 'base64').toString('ascii'),
  );
};
