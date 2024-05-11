import { Document } from 'mongoose';
import { User } from 'src/users/user.model';

export interface Organization extends Document {
  _id: string;
  name: string;
  owner: User['id'];
  members: User['id'][];
  createdAt: Date;
  createdBy: User['id'];
  updatedAt: Date;
}
