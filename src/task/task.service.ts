import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from 'src/task/task.model';
import * as uuid from 'uuid/v1';
@Injectable()
export class TaskService {
  private tasks: TaskModel[] = [
    {
      id: 1,
      title: 'This is open ticket for angular',
      description: 'This is very critical ticket for Audit',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTask(): TaskModel[] {
    return this.tasks;
  }

  addTask(title: string, description: string) {
    const newTask: TaskModel = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }
}
