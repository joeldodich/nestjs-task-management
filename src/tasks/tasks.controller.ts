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

  @Post()
  async createTask(@Body() createTaskPayload: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskPayload);
  }

  @Get()
  async getTasks(@Query() tasksFilter: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(tasksFilter).length) {
      return this.tasksService.getTasksWithFilters(tasksFilter);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: Task['id']): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: Task['id']) {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  async updateTaskStatus(
    @Param('id') id: Task['id'],
    @Body() statusUpdatePayload: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = statusUpdatePayload;
    return await this.tasksService.updateTaskStatus(id, status);
  }
}
