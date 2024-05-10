import { UserIdentity } from 'auth0';
import { Document } from 'mongoose';
import { Task } from 'src/tasks/task.model';

export interface User extends Document {
  id: string;
  sub: UserIdentity['user_id'];
  tasks: Task['id'][];
}
