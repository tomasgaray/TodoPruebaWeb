import message from 'antd/es/message';
import { alertConstants } from './alert.constants';


export function alertsReducer(state = {}, action:any) {

    switch (action.type) {
        case alertConstants.SUCCESS:
            message.success(action.message)
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertConstants.ERROR:
            message.error(action.message)
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}