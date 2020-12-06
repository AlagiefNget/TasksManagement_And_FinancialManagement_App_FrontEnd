import { FETCH_PROJECTS, NEW_PROJECT, EDIT_PROJECT, DELETE_PROJECT, COMPLETE_PROJECT, TILES_DATA } from '../actions/types';

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

const ProjectsReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case FETCH_PROJECTS:
            return {
                ...state,
                items: payload
            };
        case NEW_PROJECT:
            return {
                ...state,
                item: payload
            };
        case EDIT_PROJECT:
            return {
                ...state,
                item: payload
            };
        case DELETE_PROJECT:
            return {
                ...state,
                items: state.items.filter(project => project.id !== payload)
            };
        case COMPLETE_PROJECT:
            return {
                ...state,
                items: [
                    ...state.items.map(project => {
                        return (project.id === payload.id) ?
                            {...payload} : project
                            // {...payload, status: payload.status} : project
                    })
                ]
            };
        case TILES_DATA:
            return {
                ...state,
                tilesData: payload
            };
        default: return state;
    }
};

export default ProjectsReducer;
