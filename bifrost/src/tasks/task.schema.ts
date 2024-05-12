import { Schema } from "mongoose";

export const TaskSchema = new Schema({
  title: String,
  description: String,
  status: String,
});