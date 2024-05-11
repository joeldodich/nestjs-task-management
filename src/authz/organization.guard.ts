// write a guard that checks if the user is a member of the organization that is included in the request 'org' header
// If the user is not a member of the organization, return a 401 status code with the message 'Not authorized'

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class OrgGuard implements CanActivate {
  constructor(private organizationService: OrganizationsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const org = request.headers.org;
    console.log('org', org);

    if (!org) {
      return false;
    }

    const orgMembers = await this.organizationService.listMembers(org);
    console.log('orgMembers', orgMembers);
    console.log('request.user', request.user);
    const userIsAMember = orgMembers.some(member => member.equals(request.user));

    console.log('userIsAMember', userIsAMember);
    return userIsAMember;
  }
}