import { Document } from 'mongoose';
import { User } from 'src/users/user.model';

export declare class Organization implements Partial<Document> {
  _id: string;
  name: string;
  owner: User['_id'];
  members: User['_id'][];
  createdAt: Date;
  createdBy: User['_id'];
}
