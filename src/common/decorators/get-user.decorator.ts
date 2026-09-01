import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface AuthenticatedRequest {
  user: Record<string, unknown>;
}

export const GetUser = createParamDecorator(
  (dataUser: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    return dataUser ? user?.[dataUser] : user;
  },
);
