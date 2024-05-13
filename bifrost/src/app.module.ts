import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthzModule } from './authz/authz.module';
import { configValidationSchema } from './config.schema';
import { OrganizationsModule } from './organizations/organizations.module';
import { RebacModule } from './rebac/rebac.module';
import { SampleModule } from './sample/sample.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthzModule,
    UsersModule,
    OrganizationsModule,
    SampleModule,
    RebacModule,
  ],
})
export class AppModule {}
