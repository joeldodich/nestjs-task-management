import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizedUser } from 'src/authz/authorizedUser.decorator';
import { User } from 'src/users/user.model';
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
    @AuthorizedUser() creator: User,
  ) {
    return this.organizationService.create(createOrganizationDto, creator.id);
  }
}
