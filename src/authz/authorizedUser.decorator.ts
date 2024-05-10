import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GetUsers200ResponseOneOfInner } from 'auth0';

export const AuthorizedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): GetUsers200ResponseOneOfInner => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      return request.user as GetUsers200ResponseOneOfInner;
    } else {
      throw new Error('Incorrect user payload');
    }
  },
);
