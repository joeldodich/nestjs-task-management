import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizedUser } from 'src/authz/authorizedUser.decorator';
import { RebacService } from 'src/rebac/rebac.service';
import { User } from 'src/users/user.model';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './organization.model';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
@UseGuards(AuthGuard('jwt'))
export class OrganizationsController {
  constructor(
    private organizationService: OrganizationsService,
    private rebacService: RebacService,
  ) {}

  @Get()
  getOrganizations(@Req() request: Organization['_id']) {
    console.log('request', request);
  }

  @Post()
  async createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @AuthorizedUser() creator: User,
  ) {
    const organization = await this.organizationService.create(
      createOrganizationDto,
      creator.id,
    );
    await this.rebacService.createRelations([
      {
        user: `user:${creator.id}`,
        relation: 'member',
        object: `organization:${organization._id.toString()}`,
      },
      {
        user: `user:${creator.id}`,
        relation: 'owner',
        object: `organization:${organization._id.toString()}`,
      },
    ]);
    return organization;
  }
}
