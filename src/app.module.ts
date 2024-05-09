import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb+srv://joeledodich:kv8c6IKAUjC8adlx@cluster0.81zgsu7.mongodb.net/'), AuthModule],
})
export class AppModule {}
