import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.emum";

export class UpdateTaskDto{
    @IsEnum(TaskStatus)
    status:TaskStatus;
}