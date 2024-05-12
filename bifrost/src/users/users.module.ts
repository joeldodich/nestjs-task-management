import { Module } from '@nestjs/common';
import { Auth0DbConnector } from './auth0.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  providers: [{provide: UsersService, useClass: Auth0DbConnector}],
  controllers: [UsersController],
  exports: [{provide: UsersService, useClass: Auth0DbConnector}],
})
export class UsersModule {}
