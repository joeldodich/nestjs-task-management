import { Schema } from 'mongoose';

export const OrganizationSchema = new Schema({
  name: String,
  owner: String,
  members: [String],
  createdAt: Date,
  createdBy: String,
});
