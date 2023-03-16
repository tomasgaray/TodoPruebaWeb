export class Task{
    taskId?: number;
    title?:string;
    description?:string;
    createdDate?:Date;
    completed?: boolean;

    constructor(data?: Task){
        if(data== null) return;
        this.taskId = data.taskId;
        this.title = data.title;
        this.description = data.description;
        this.createdDate = data.createdDate;
        this.completed = data.completed;
    }
}