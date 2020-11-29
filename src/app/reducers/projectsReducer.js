import { FETCH_PROJECTS, NEW_PROJECT } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    projectsCount: 0
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
const ProjectsReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case FETCH_PROJECTS:
            return {
                ...state,
                projects: payload
            };
        case NEW_PROJECT:
            return {
                ...state,
                project: payload
            };
        // case LOGIN_USER:
        //     return {
        //         ...state,
        //         user: payload
        //     };
        default: return state;
    }
};

export default ProjectsReducer;
