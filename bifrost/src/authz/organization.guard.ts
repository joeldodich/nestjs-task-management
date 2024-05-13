import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class OrgGuard implements CanActivate {
  constructor(private organizationService: OrganizationsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const orgId = request.headers.org;

    if (!orgId) {
      throw new BadRequestException(
        'Valid organization ID not provided in request headers.',
      );
    }

    if (!request.user.id) {
      throw new UnauthorizedException('No valid token provided.');
    }

    const org = await this.organizationService.findOne(orgId);
    const userIsAMember = org.members.some(
      (member) => member === request.user.id,
    );

    return userIsAMember;
  }
}
