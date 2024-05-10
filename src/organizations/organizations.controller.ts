import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUsers200ResponseOneOfInner } from 'auth0';
import { AuthorizedUser } from 'src/authz/authorizedUser.decorator';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
@UseGuards(AuthGuard('jwt'))
export class OrganizationsController {
  constructor(private organizationService: OrganizationsService) {}

  @Get()
  getOrganizations(@Req() request) {
    console.log('request', request);
  }

  @Post()
  createOrganization(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @AuthorizedUser() creator: GetUsers200ResponseOneOfInner,
  ) {
    return this.organizationService.createOrganization(
      createOrganizationDto,
      creator.user_id,
    );
  }
}
