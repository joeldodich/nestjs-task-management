import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('organizations')
export class OrganizationsController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getOrganizations(@Req() request) {
    console.log('request', request);
  }
}
