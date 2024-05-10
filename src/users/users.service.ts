import { Injectable } from '@nestjs/common';
import { ManagementClient } from 'auth0';

@Injectable()
export class UsersService {
  private readonly auth0 = new ManagementClient({
    domain: process.env.AUTH0_ISSUER_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  });

  async getUserById(id: string) {
    return await this.auth0.users.get({ id });
  }
}
