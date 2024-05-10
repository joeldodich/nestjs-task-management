import { Schema } from 'mongoose';

export const OrganizationSchema = new Schema({
  name: String,
  owner: Schema.ObjectId,
  members: [Schema.ObjectId],
  createdAt: Date,
  createdBy: String,
});
