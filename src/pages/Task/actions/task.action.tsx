import { DataDialogProps } from "../models/data.dialog.props";
import { Task } from "../models/task";
import { Dispatch } from "@reduxjs/toolkit";
import { taskConstants } from "../constants/task.constants";
import { taskService } from "../services/task.service";
import { alertActions } from "../../../Components/alert/alert.actions";

export const taskActions = {
    add,
    edit,
    remove,
    // search,
    openModalAddEdit,
    closeModalAddEdit
};

function openModalAddEdit(openModalAddEdit:DataDialogProps<(Task)>) {
    return { type: taskConstants.OPEN_MODAL_ADD_EDIT, openModalAddEdit };
}
function closeModalAddEdit() {
    return { type: taskConstants.CLOSE_MODAL_ADD_EDIT};
}

// function search(text:string) {
//     return (dispatch: Dispatch) => {
//         dispatch(request(suscription));
//         suscriptionService.save(suscription)
//             .then((result)=> { 
//                     dispatch(success(result.data));
//                     dispatch(alertActions.success(`Suscripción agregado exitosamente ${result.data.suscriptionId}`));
//                     dispatch( printComprobant(result.data.suscriptionId!)  as any);
//                 },
                         

//             ).catch((error)=>{
//                 const message =
//                 (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      
//                 dispatch(failure(suscription,message));
//                 dispatch(alertActions.error(message));
              
//             });
//     };
//     function request(suscription:Suscription) { return { type: suscriptionConstants.SAVE_REQUEST, suscription } }
//     function success(suscription:Suscription) { return { type: suscriptionConstants.SAVE_SUCCESS, suscription } }
//     function failure(suscription:Suscription, error:any) { return { type: suscriptionConstants.SAVE_FAILURE, suscription, error } }
// }


function add(task:Task) {
    return (dispatch: Dispatch) => {
        dispatch(request());
        taskService.add(task)
            .then((result)=> { 
                    dispatch(success(result.data));
                    dispatch(alertActions.success("Tarea agregada"));
                    dispatch(closeModalAddEdit());
                },
            ).catch((error)=>{
                const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      
                dispatch(failure(task,message));
                dispatch(alertActions.error(message));
            });
    };
    function request() { return { type: taskConstants.ADD_TASK_REQUEST } }
    function success(task:Task) { return { type: taskConstants.ADD_TASK_SUCCESS, task } }
    function failure(currentTask:Task, error:any) { return { type: taskConstants.ADD_TASK_FAILURE, currentTask, error } }
}

function edit(task:Task) {
    return (dispatch: Dispatch) => {
        dispatch(request());
        taskService.edit(task)
            .then((result)=> { 
                    dispatch(success(result.data));
                    dispatch(alertActions.success("Tarea editada"));
                    dispatch(closeModalAddEdit());
                },
            ).catch((error)=>{
                const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      
                dispatch(failure(task,message));
                dispatch(alertActions.error(message));
            });
    };
    function request() { return { type: taskConstants.EDIT_TASK_REQUEST } }
    function success(task:Task) { return { type: taskConstants.EDIT_TASK_SUCCESS, task } }
    function failure(currentTask:Task, error:any) { return { type: taskConstants.EDIT_TASK_FAILURE, currentTask, error } }
}

// function edit(suscription:Suscription ,itemId: string) {
//     return (dispatch: Dispatch) => {
//         dispatch(request(suscription));
//         suscriptionService.addLine(suscription, itemId)
//             .then((result)=> { 
//                     dispatch(success(result.data));
//                 },

//             ).catch((error)=>{
//                 const message =
//                 (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      
//                 dispatch(failure(suscription,message));
//                 dispatch(alertActions.error(message));
//             });
//     };
//     function request(suscription:Suscription) { return { type: suscriptionConstants.ADD_LINE_REQUEST, suscription } }
//     function success(suscription:Suscription) { return { type: suscriptionConstants.ADD_LINE_SUCCESS, suscription } }
//     function failure(suscription:Suscription, error:any) { return { type: suscriptionConstants.ADD_LINE_FAILURE, suscription, error } }
// }
function remove(taskId:number) {
    return (dispatch: Dispatch) => {
        dispatch(request());
        taskService.remove(taskId)
            .then(()=> { 
                    dispatch(success(taskId));
                },

            ).catch((error)=>{
                const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      
                dispatch(failure(message));
                dispatch(alertActions.error(message));
            });
    };
    function request() { return { type: taskConstants.REMOVE_TASK_REQUEST, } }
    function success(taskId:number) { return { type: taskConstants.REMOVE_TASK_SUCCESS, taskId } }
    function failure(error:any) { return { type: taskConstants.REMOVE_TASK_FAILURE, error } }
}