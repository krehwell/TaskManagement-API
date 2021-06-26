import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.enum';

export class FilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: string;

    @IsOptional()
    @IsString()
    search?: string;
}
