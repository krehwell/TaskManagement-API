import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.enum';
import { CreateTaskDto } from './dto/createTask.dto';
import { FilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class TasksService {
    private logger = new Logger('Task Services', true);
    constructor(private taskRepository: TaskRepository) {}

    getTasks(filterDto: FilterDto, user: User): Promise<Task[]> {
        this.logger.verbose(`User ${user.username} get task ${JSON.stringify(filterDto)}`);

        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, user } });

        if (!found) {
            throw new NotFoundException(`Task with id: ${id} is not Found`);
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const { affected } = await this.taskRepository.delete({ id, user });

        if (affected === 0) {
            throw new NotFoundException(`Task with id: ${id} is not Found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;

        return await this.taskRepository.save(task);
    }
}
