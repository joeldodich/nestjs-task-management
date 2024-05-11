import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/user.model';

export const AuthorizedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User['_id'] => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
      return request.user as User['_id'];
    } else {
      throw new Error('Incorrect user payload');
    }
  },
);
