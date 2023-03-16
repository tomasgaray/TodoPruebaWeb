import { DataDialogProps } from "./data.dialog.props";
import { Task } from "./task";

export interface TaskState{
    loading: boolean, 
    loadingSearch: boolean,
    error: string,
    tasks: Task[],
    openModalAddEdit: DataDialogProps<Task>
}