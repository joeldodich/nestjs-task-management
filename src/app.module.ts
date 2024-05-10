import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthzModule } from './authz/authz.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TasksModule,
    MongooseModule.forRoot(
      'mongodb+srv://joeledodich:kv8c6IKAUjC8adlx@cluster0.81zgsu7.mongodb.net/',
    ),
    AuthzModule,
    UsersModule,
  ],
})
export class AppModule {}
