import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: `Status must be one of the following: ${Object.values(TaskStatus)}`,
  })
  status: TaskStatus;
}
