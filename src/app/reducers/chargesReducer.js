import {NEW_CHARGE} from '../actions/types';

const initialState = {
    items: [],
    item: {},
    tilesData: {},
    projectsCount: 0
};

//Reducers are pure functions that take the current state of an application, perform an action, and return a new state.
/*
* Reducer to handle any action with type FETCH_PROJECTS
* case FETCH_PROJECTS:
            return {
                ...state,
                items: payload
            };
            *
*
* */

const ChargesReducer = (state = initialState, { type, payload }) => {
    switch(type){
        // case FETCH_PROJECTS:
        //     return {
        //         ...state,
        //         items: payload
        //     };
        case NEW_CHARGE:
            return {
                ...state,
                item: payload
            };
        default: return state;
    }
};

export default ChargesReducer;
