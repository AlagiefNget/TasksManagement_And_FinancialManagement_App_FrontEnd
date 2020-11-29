import {DELETE_CLIENT, FETCH_CLIENTS, NEW_CLIENT, GET_CLIENT} from '../actions/types';

const initialState = {
    items: [],
    item: {},
    clientsCount: 0
};

//Reducers are pure functions that take the current state of an application, perform an action, and return a new state.
/*
* Reducer to handle any action with tyoe FETCH_PROJECTS
*
* case FETCH_PROJECTS:
            return {
                ...state,
                projects: payload
            };
            *
*
* */
const ClientsReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case FETCH_CLIENTS:
            return {
                ...state,
                items: payload
            };

        case NEW_CLIENT:
            return {
                ...state,
                item: payload
            };

        case DELETE_CLIENT:
            return {
                ...state,
                items: state.items.filter(client => client.id !== payload)
            };
        case GET_CLIENT:
            return {
                ...state,
                item: payload
            };
        default: return state;
    }
};

export default ClientsReducer;
