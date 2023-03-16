import { Task } from "../pages/Task/models/task";

export const filter = (tasks: Task[], taskStatus: number) => {
    let statusCompleted =  (taskStatus==1);
    if(taskStatus == -1) return tasks;
    return tasks.filter((x) => x.completed== statusCompleted)
};