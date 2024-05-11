import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './organization.model';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel('Organization')
    private readonly organizationModel: Model<Organization>,

    private userService: UsersService,
  ) {}

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
    creatorId: User['_id'],
  ): Promise<Organization> {
    const createdAt = new Date().toISOString();
    const payload = {
      ...createOrganizationDto,
      owner: creatorId,
      members: [creatorId],
      createdAt: createdAt,
      createdBy: creatorId,
      updatedAt: createdAt,
    };
    const organization = new this.organizationModel(payload);
    return await organization.save();
  }

  async listMembers(organizationId: Organization['_id']): Promise<User[]> {
    const organization = await this.organizationModel.findById(organizationId);
    if (!organization) {
      throw new Error('Organization not found');
    }
    const userIds = organization.members;
    const members = await this.userService.findUsersByIds(userIds);
    return members;
  }
}
