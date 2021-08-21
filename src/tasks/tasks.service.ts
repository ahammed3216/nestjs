import { Get, Injectable, NotFoundException } from '@nestjs/common';

import {v4 as uuid} from 'uuid'
import {TaskStatus} from './task-status.emum'
import { CreateTaskDto } from './dto/create-task.dto';
import { title } from 'process';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { threadId } from 'worker_threads';

@Injectable()
export class TasksService {
    constructor 
    (
        @InjectRepository(TaskRepository)
        private tasksrepository:TaskRepository
        ){}
   

    async gettask(gettaskfilterdo:GetTasksFilterDto):Promise<Task[]>{
        const {status,search}=gettaskfilterdo;
        const query=this.tasksrepository.createQueryBuilder('task')
        
        if(status){
            query.andWhere('task.status=:status',{status})
        }
        if(search){
            query.andWhere(
             'task.title LIKE :search OR task.description LIKE :search',{search: '%${search}%' }   
            );
        }
        const tasks=await query.getMany();
        return tasks;
    }
    // getalltasks():Task[]{
    //     return this.tasks;
    // }

    async createtask(createtaskdto:CreateTaskDto):Promise<Task>{
        const {title,description}=createtaskdto;
        const task=this.tasksrepository.create({
            title,
            description,
            status:TaskStatus.approved
            


        })
        
        await this.tasksrepository.save(task);
        return task;
    }
    // createtask(createtaskdto:CreateTaskDto):Task{
    //     const {title,description}=createtaskdto;
    //     const task:Task={
    //     id:uuid(),
    //     title,
    //     description,
    //     status : TaskStatus.approved,
    //     };
        
    //     this.tasks.push(task);
    //     return task;


    // }

    async gettaskbyid(id:string):Promise<Task>{
        const found=await this.tasksrepository.findOne(id);
        if (!found){
            throw new NotFoundException();
        }
        return found;


    }

    // gettaskbyid(id:string):Task{
    //     const task:Task=this.tasks.find((task) => task.id === id );
    //     if (!task){
    //         throw new NotFoundException();
    //     }
    //     return task;
    
    // }
    async deletetask(id:string):Promise<any>{
        const result=await this.tasksrepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException();
        }
        
        

    }

    // deletetask(id:string):void{
    //     let found=this.gettaskbyid(id);
    //     this.tasks=this.tasks.filter((task) => found.id != id)
    // }

    async updatetask(id:string,status:TaskStatus):Promise<Task>{
        const task=await this.gettaskbyid(id);
        task.status=status;
        await this.tasksrepository.save(task);
        return task;

    }

    // updatetask(id:string,status:TaskStatus):Task{
    //     const task=this.gettaskbyid(id);
    //     task.status=status;
    //     return task;
    // }

    // gettaskswithfilter(filterdto:GetTasksFilterDto):Task[]{
    //     const{status ,search}=filterdto;

    //     let tasks=this.getalltasks();

    //     if(status){
    //      tasks=tasks.filter((task) => task.status === status);
         
    //     }

    //     if (search){
    //         tasks=tasks.filter((task) =>
    //         {
    //             if(task.title.includes(search) || task.description.includes(search))
    //                 return true;
                
    //             return false;
    //         });
            

    //     }
    //     return tasks;
    // }
    }

    


