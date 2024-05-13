import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RebacModule } from 'src/rebac/rebac.module';
import { UsersModule } from 'src/users/users.module';
import { OrganizationSchema } from './organization.schema';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Organization', schema: OrganizationSchema },
    ]),
    UsersModule,
    RebacModule,
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
