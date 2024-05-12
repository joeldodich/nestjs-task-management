import { Document } from "mongoose";
import { Organization } from "src/organizations/organization.model";

export interface Task extends Document {
  _id: string;
  owner: Organization['_id'];
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
