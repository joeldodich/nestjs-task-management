import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.model';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './organization.model';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel('Organization')
    private readonly organizationModel: Model<Organization>,
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
}
