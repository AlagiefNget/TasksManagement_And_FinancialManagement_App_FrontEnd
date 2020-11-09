import { FETCH_TODOS, NEW_TODO, DELETE_TODO, GET_TODO, UPDATE_TODO } from '../actions/types';

const initialState = {
    items: [],
    item: {}
};

const TodosReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case FETCH_TODOS:
            return {
                ...state,
                items: payload
            }
        case NEW_TODO:
            return {
                ...state,
                item: payload
            }
        case DELETE_TODO:
            return {
                ...state,
                items: state.items.filter(todo => todo.id !== payload)
            }
        case GET_TODO:
            return {
                ...state,
                item: payload
            }
        // case UPDATE_TODO:
        //     return {
        //         ...state,
        //         items: payload
        //     }
        default: return state;
    }
};

export default TodosReducer;