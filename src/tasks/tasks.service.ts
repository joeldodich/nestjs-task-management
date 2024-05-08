import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel({
      ...createTaskDto,
      status: TaskStatus.OPEN,
    });
    return await task.save();
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async getTasksWithFilters(filters: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filters;
    let statusTasks: Task[];
    let searchTasks: Task[];
    if (status) {
      statusTasks = await this.taskModel.find({ status }).exec();
    }
    if (search) {
      const searchTasks = await this.taskModel
        .find({ title: { $regex: search, $options: 'i' } })
        .exec();
    }

    if (!statusTasks && !searchTasks) {
      return [];
    } else if (!statusTasks) {
      return searchTasks;
    } else if (!searchTasks) {
      return statusTasks;
    } else {
      return [...statusTasks, ...searchTasks].filter(
        (task, index, self) =>
          index === self.findIndex((t) => t.id === task.id),
      );
    }
  }

  async getTaskById(id: Task['id']): Promise<Task> {
    const found = await this.taskModel.findById(id).exec();
    if (!found) {
      throw new NotFoundException(`Task with ID of ${id} does not exist.`);
    }
    return found;
  }

  async updateTaskStatus(id: Task['id'], status: TaskStatus): Promise<Task> {
    const task = await this.taskModel
      .findOneAndUpdate({ _id: id }, { status }, { new: true })
      .exec();
    return task;
  }

  deleteTask(id: Task['id']) {
    return this.taskModel.deleteOne({ _id: id }).exec();
  }
}
