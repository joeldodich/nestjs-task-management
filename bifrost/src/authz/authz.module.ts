import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsersModule, OrganizationsModule],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthzModule {}
