import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";
import { User } from "src/auth/user.entity";

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
});

const mockUser: User = {
    username: "yakuza",
    id: "idofyuza",
    password: "papapa",
    tasks: []
};

describe('Task service', () => {
    let taskService: TasksService;
    let taskRepository;

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
});
