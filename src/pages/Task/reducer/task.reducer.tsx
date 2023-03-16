import { TypeDialog } from "../../../enums/type.dialog";
import { taskConstants } from "../constants/task.constants";
import { Task } from "../models/task";
import { TaskState } from "../models/task.state";

const initialState: TaskState = { 
    loading: false, 
    loadingSearch: false,
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
            return {
                ...state,
                loading: false,
                tasks: [action.task,...state.tasks??[]],
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
        
        
        // case taskConstants.ADD_LINE_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         suscription: action.suscription
        //     };
        // case taskConstants.ADD_LINE_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         suscription: action.suscription
        //     };
        // case taskConstants.ADD_LINE_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         suscription: action.suscription
        //     };

        //  case taskConstants.EDIT_LINE_QUANTITY_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         suscription: action.suscription
        //     };
        // case taskConstants.EDIT_LINE_QUANTITY_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         suscription: action.suscription
        //     };
        // case taskConstants.EDIT_LINE_QUANTITY_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         suscription: action.suscription
        //     };
        //  case taskConstants.GET_ACTIVE_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         activeSuscriptions: []
        //     };
        // case taskConstants.GET_ACTIVE_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         activeSuscriptions: action.activeSuscriptions
        //     };
        // case taskConstants.GET_ACTIVE_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         activeSuscriptions: []
        //     };
        //  case taskConstants.GET_SEARCH_ACTIVE_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         activeSuscriptions: []
        //     };
        // case taskConstants.GET_SEARCH_ACTIVE_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         activeSuscriptions: action.activeSuscriptions
        //     };
        // case taskConstants.GET_SEARCH_ACTIVE_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         activeSuscriptions: []
        //     };
        //  case taskConstants.UPDATE_HISTORICAL_REQUEST:
        //     return {
        //         ...state,
        //         openHistorical: {
        //             open: state.openHistorical.open,
        //             select: action.historical,
        //             type: state.openHistorical.type,
        //             loading: true
        //         },

        //     };
        // case taskConstants.UPDATE_HISTORICAL_SUCCESS:
        //     return {
        //         ...state,
        //         openHistorical: {
        //             open: false,
        //             select: new SuscriptionHistorical(),
        //             type: state.openHistorical.type,
        //             loading: false
        //         },
        //         activeSuscriptions: action.activeSuscriptions
        //     };
        // case taskConstants.UPDATE_HISTORICAL_FAILURE:
        //     return {
        //         ...state,
        //         openHistorical: {
        //             open: state.openHistorical.open,
        //             select: action.historical,
        //             type: state.openHistorical.type,
        //             loading: false
        //         },
        //     };
        

        default:
            return state
    }
}