import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.enum';
import { CreateTaskDto } from './dto/createTask.dto';
import { FilterDto } from './dto/filterTask.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(private taskRepository: TaskRepository) {}

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskWithFilters(filters: FilterDto): Task[] {
    //     let tasks = this.getAllTasks();
    //     const { search, status } = filters;

    //     if (status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter((task) => {
    //             if (task.title.includes(search) || task.description.includes(search)) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }

    //     return tasks;
    // }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with id: ${id} is not Found`);
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
