import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() tasksFilter: GetTasksFilterDto): Task[] {
    if (Object.keys(tasksFilter).length) {
      return this.tasksService.getTasksWithFilters(tasksFilter);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() createTaskPayload: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskPayload);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: Task['id']): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: Task['id']): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: Task['id'],
    @Body() statusUpdatePayload: UpdateTaskStatusDto,
  ): Task {
    const { status } = statusUpdatePayload;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
