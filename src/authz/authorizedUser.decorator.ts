import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/user.model';

export const AuthorizedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      return request.user as User;
    } else {
      throw new Error('Incorrect user payload');
    }
  },
);
