import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class FilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: string;

    @IsOptional()
    @IsString()
    search?: string;
}
