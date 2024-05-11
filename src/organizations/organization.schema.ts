import { Schema } from 'mongoose';

export const OrganizationSchema = new Schema({
  name: String,
  owner: Schema.Types.ObjectId,
  createdAt: Date,
  createdBy: String,
  members: [Schema.Types.ObjectId],
  tasks: [Schema.Types.ObjectId],
});
