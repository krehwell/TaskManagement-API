import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/createTask.dto';
import { FilterDto } from './dto/filterTask.dto';
import { UpdateTaskStatusDto } from './dto/updateTaskStatus.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(@Query() filters: FilterDto): Task[] {
        if (Object.keys(filters).length) {
            return this.taskService.getTaskWithFilters(filters);
        } else {
            return this.taskService.getAllTasks();
        }
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id, status);
    }
}
