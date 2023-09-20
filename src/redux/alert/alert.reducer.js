import * as alertActions from '../alert/alert.actions';
export const alertFeatureKey='alert-info';

let initialState={
    alertMessages:[]
}

export const reducer=(state=initialState,action)=>{
    let {type,payload}=action;
    switch (type){
        case  alertActions.SET_ALERT:
            return {
                ...state,
                alertMessages:[...state.alertMessages,payload]
            }
        case alertActions.REMOVE_ALERT:
            return {
                ...state,
                alertMessages: state.alertMessages.filter((alertMessage)=> alertMessage.id !== payload.id)
            }
        default:return state;

    }
}