import { Schema } from 'mongoose';

export const OrganizationSchema = new Schema({
  name: String,
  owner: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
  createdAt: Date,
  createdBy: String,
});
