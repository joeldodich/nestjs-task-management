import { Injectable, NotFoundException } from '@nestjs/common';
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
    const found =  await this.userModel.findById(id);
    if (!found) {
      throw new NotFoundException(`User with ID of ${id} does not exist.`);
    }
    return found;
  }

  async findUsersByIds(ids: string[]): Promise<User[]> {
    return await this.userModel.find({ _id: { $in: ids } });
  }

  /**
   * 
   * @param sub The Auth0 user_id / sub value
   * @returns A full user object from the Auth0 Management API
   */
  async getUserByAuth0Sub(sub: string): Promise<User> {
    const found = await this.userModel.findOne({ sub });
    if (!found) {
      throw new NotFoundException(`User with sub of ${sub} does not exist.`);
    }
    return found;
  }

  async getAuth0User(id: string) {
    return await this.auth0.users.get({ id });
  }

  async syncWithAuth0(sub: string): Promise<User> {
    const user = await this.getUserByAuth0Sub(sub);
    if (user) return user;
    const createdUser = await this.createUser(sub);
    return createdUser;
  }
}
