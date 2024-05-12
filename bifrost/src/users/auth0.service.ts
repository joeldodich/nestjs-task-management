import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUsers200ResponseOneOfInner, ManagementClient } from 'auth0';
import { User } from './user.model';
import { UsersService } from './users.service';

@Injectable()
export class Auth0DbConnector implements UsersService {
  private readonly auth0 = new ManagementClient({
    domain: process.env.AUTH0_ISSUER_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  });

  public async getUserById(id: User['id']): Promise<User> {
    const res = await this.auth0.users.get({ id });
    if (!res.data.user_id) {
      throw new NotFoundException(`User with ID of ${id} does not exist.`);
    }
    const userData = res.data as GetUsers200ResponseOneOfInner;
    return {
      id: userData.user_id,
      name: userData.name,
      email: userData.email,
      email_verified: userData.email_verified,
      locale: userData.locale,
      picture: userData.picture,
      updated_at: userData.updated_at.toString(),
    };
  }

  public async findUsersByIds(ids: User['id'][]): Promise<User[]> {
    const res = await this.auth0.users.getAll({ q: `user_id:(${ids.join(' OR ')})` });
    return res.data.map((userData) => ({
      id: userData.user_id,
      name: userData.name,
      email: userData.email,
      email_verified: userData.email_verified,
      locale: userData.locale,
      picture: userData.picture,
      updated_at: userData.updated_at.toString(),
    }));
  }
}
