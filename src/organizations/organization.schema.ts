import { Schema } from 'mongoose';

export const OrganizationSchema = new Schema({
  name: String,
  owner: String,
  createdAt: Date,
  createdBy: String,
  members: [String],
  tasks: [Schema.Types.ObjectId],
});
