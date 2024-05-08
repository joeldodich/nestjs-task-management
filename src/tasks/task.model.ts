import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

export interface Task extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
