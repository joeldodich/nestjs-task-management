import { UserIdentity } from 'auth0';
import { Document } from 'mongoose';

export interface User extends Document {
  _id: string;
  sub: UserIdentity['user_id'];
}
