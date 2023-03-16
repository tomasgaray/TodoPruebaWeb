import { TypeDialog } from "../../../enums/type.dialog";
import { taskConstants } from "../constants/task.constants";
import { Task } from "../models/task";
import { TaskState } from "../models/task.state";

const initialState: TaskState = { 
    loading: false, 
    error: "",
    tasks: []
      ,
    openModalAddEdit: {
        open: false,
        select: new Task(),
        type: TypeDialog.add,
        loading: false,
    }
};

export function tasksReducer(state:TaskState = initialState, action:any) {
    switch (action.type) {

        case taskConstants.OPEN_MODAL_ADD_EDIT:
            return {
                ...state,
                openModalAddEdit: action.openModalAddEdit
            };
        case taskConstants.CLOSE_MODAL_ADD_EDIT:
            return {
                ...state,
                openModalAddEdit: {
                  open: false,
                  select: new Task(),
                  type: TypeDialog.add,
                  loading: false,
                }
            };

        //#region get
        case taskConstants.GET_TASK_REQUEST:
            return {
                ...state,
                tasks: [],
                loading:true
            };
        case taskConstants.GET_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.tasks
            };
        case taskConstants.GET_TASK_FAILURE:
            return {
                ...state,
                loading: false,
            };
        //#endregion


        //#region add
        case taskConstants.ADD_TASK_REQUEST:
            return {
                ...state,
                openModalAddEdit: {
                    open: state.openModalAddEdit.open,
                    select: state.openModalAddEdit.select,
                    type: TypeDialog.add,
                    loading: true,
                }
            };
        case taskConstants.ADD_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: [action.task,...state.tasks??[]],
            };
        case taskConstants.ADD_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                openModalAddEdit: {
                    open: true,
                    select: action.currentTask,
                    type: TypeDialog.add,
                    loading: false,
                }
            };
        //#endregion

        //#region edit
        case taskConstants.EDIT_TASK_REQUEST:
            return {
                ...state,
                openModalAddEdit: {
                    open: state.openModalAddEdit.open,
                    select: state.openModalAddEdit.select,
                    type: TypeDialog.edit,
                    loading: true,
                }
            };
        case taskConstants.EDIT_TASK_SUCCESS:
            let newTasksEdit = [...(state.tasks??[])]
            let currentIndex = newTasksEdit.findIndex(x=> x.taskId === action.task.taskId);
            if(currentIndex !=-1){
                newTasksEdit[currentIndex] = action.task;
            } 
            return {
                ...state,
                loading: false,
                tasks: [...newTasksEdit],
            };
        case taskConstants.EDIT_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                openModalAddEdit: {
                    open: true,
                    select: action.currentTask,
                    type: TypeDialog.edit,
                    loading: false,
                }
            };
        //#endregion


        //#region remove
        case taskConstants.REMOVE_TASK_REQUEST:
            return {
                ...state,
                 loading: true,
            };
         case taskConstants.REMOVE_TASK_SUCCESS:
            let newTasks = (state.tasks??[]).filter(x=> x.taskId != action.taskId);
            return {
                ...state,
                loading: false,
                tasks: [...newTasks]
            };
        case taskConstants.REMOVE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
            };
        //#endregion


        //#region change Status
        case taskConstants.CHANGE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case taskConstants.CHANGE_STATUS_SUCCESS:
            let newTasksEditStatus = [...(state.tasks??[])]
            let currentIndexEdit = newTasksEditStatus.findIndex(x=> x.taskId === action.task.taskId);
            if(currentIndexEdit !=-1){
                newTasksEditStatus[currentIndexEdit] = action.task;
            } 
            return {
                ...state,
                loading: false,
                tasks: [...newTasksEditStatus],
            };
        case taskConstants.CHANGE_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        //#endregion
    
        default:
            return state
    }
}