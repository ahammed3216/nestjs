import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus} from './task-status.emum'
import { CreateTaskDto } from './dto/create-task.dto';
import { timeStamp } from 'console';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/uptate-task.dto';
import {Task} from './task.entity'

@Controller('tasks')
export class TasksController {
constructor (private taskservice:TasksService){}

@Get()
gettask(@Query() filterdto:GetTasksFilterDto):Promise<Task[]>{
    return this.taskservice.gettask(filterdto)
}
// @Get()
// gettasks(@Query() filterdto:GetTasksFilterDto):Task[]{
//     if(Object.keys(filterdto).length){
//         return this.taskservice.gettaskswithfilter(filterdto);

//     }
//     else{
//     return this.taskservice.getalltasks();
//     }
// }

@Post()
createtask(@Body() creataskdto:CreateTaskDto):Promise<Task>{
    return this.taskservice.createtask(creataskdto);
}

// @Post()
// createtask(@Body() createtaskdto:CreateTaskDto):Task{
    
//     return this.taskservice.createtask(createtaskdto);
    
// }

@Get('/:id')
gettaskbyid(@Param('id') id:string):Promise<Task>{
    return this.taskservice.gettaskbyid(id);

}
// @Get('/:id')
// gettaskbyid(@Param('id') id:string):Task{
//     return this.taskservice.gettaskbyid(id);

// }
@Delete('/:id')
deletetask(@Param('id') id:string):Promise<void>{
    return this.taskservice.deletetask(id);
}
// @Delete('/:id')
// deletetask(@Param('id') id:string):void{
//     this.taskservice.deletetask(id);
// }

@Patch('/:id/status')
updateaskstatus(@Param('id') id:string,@Body() updatetaskdto:UpdateTaskDto):Promise<Task>{
    const{status}=updatetaskdto;
    return this.taskservice.updatetask(id,status);
}
// @Patch('/:id/status')
// updatetaskstaus(@Param('id') id:string,@Body() updatetaskdto:UpdateTaskDto):Task{
//     const {status}=updatetaskdto;
//     return this.taskservice.updatetask(id,status);
// }
}

