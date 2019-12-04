import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskModel } from 'src/task/task.model';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  getAll(): TaskModel[] {
    return this.taskService.getAllTask();
  }

  @Post()
  createTask(@Body() body): TaskModel {
    return this.taskService.addTask(body.title, body.description);
  }
}
