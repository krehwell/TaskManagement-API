import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";
import { User } from "src/auth/user.entity";
import { TaskStatus } from "./task.enum";
import { NotFoundException } from "@nestjs/common";

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
});

const mockUser: User = {
    username: "testing username",
    id: "testing user id",
    password: "testing password",
    tasks: []
};

describe('Task service', () => {
    let taskService: TasksService;
    let taskRepository; // a dummy, just to test instead of import the real repository

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTasksRepository }
            ]
        }).compile();

        taskService = module.get(TasksService);
        taskRepository = module.get(TaskRepository);
    });

    describe('getTasks', () => {
        it('calls TaskRepository.getTasks, and returns the result', async () => {
            taskRepository.getTasks.mockResolvedValue('some value');

            const result = await taskService.getTasks(null, mockUser);

            expect(result).toEqual('some value');
        });
    });

    describe('getTaskById', () => {
        it('calls TaskRepository.findOne, and returns the result', async () => {
            const mockTask = {
                id: "testing id",
                title: "testing title",
                description: "testing desc",
                status: TaskStatus.OPEN,
            }

            taskRepository.findOne.mockResolvedValue(mockTask);

            const result = await taskService.getTaskById('some id', mockUser);

            expect(result).toEqual(mockTask);
        });

        it('calls TaskRepository.findOne, and handles error', async () => {
            taskRepository.findOne.mockResolvedValue(null);

            expect(taskService.getTaskById('some id', mockUser)).rejects.toThrow(NotFoundException);
        });
    });
});
