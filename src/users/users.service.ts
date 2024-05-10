import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ManagementClient } from 'auth0';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  private readonly auth0 = new ManagementClient({
    domain: process.env.AUTH0_ISSUER_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  });

  async createUser(sub: string): Promise<User> {
    const user = new this.userModel({ sub });
    return await user.save();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  /**
   * 
   * @param sub The Auth0 user_id / sub value
   * @returns A full user object from the Auth0 Management API
   */
  async getUserByAuth0Sub(sub: string): Promise<User> {
    return await this.userModel.findOne({ sub });
  }

  async getAuth0User(id: string) {
    return await this.auth0.users.get({ id });
  }

  async syncWithAuth0(sub: string): Promise<User> {
    const user = await this.getUserByAuth0Sub(sub);
    console.log('user', user);
    if (user) return user;
    const createdUser = await this.createUser(sub);
    return createdUser;
  }
}
