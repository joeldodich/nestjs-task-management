import { IsNotEmpty, IsString } from "class-validator";
import { Task } from "../task.model";
export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: Task['title'];

    @IsNotEmpty()
    @IsString()
    description: Task['description'];
}

