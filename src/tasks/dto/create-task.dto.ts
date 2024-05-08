import { Task } from "../task.model";

export class CreateTaskDto {
    title: Task['title'];
    description: Task['description'];
}