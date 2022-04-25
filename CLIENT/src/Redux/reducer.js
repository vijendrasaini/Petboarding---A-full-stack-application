import { AUTH, FETCH_DATA, LOADING } from "./action"

const initState = {
    dataArr : [],
    loding : false,
    auth : localStorage.getItem('token') ? true : false
}

export const reducer = ( state = initState, { type , payload}) =>{
    switch(type){
        case FETCH_DATA :
            return {...state, dataArr : payload }
        case LOADING :
            return {...state, loding : payload}
        case AUTH :
            return { ...state, auth : payload }
        default :
            return state
    }
}