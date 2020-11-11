import { FETCH_TODOS, NEW_TODO, DELETE_TODO, GET_TODO, COMPLETE_TODO, UPDATE_TODO, GET_COUNT } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    numOfTodos: 0
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
        case COMPLETE_TODO:
            return {
                ...state,
                items: [
                    ...state.items.map(todo => {
                     return (todo.id === payload.id) ?
                         {...todo, status: payload.status} : todo
                   })
                 ] 
            }
        case UPDATE_TODO:
            return {
                ...state,
                items: [
                    ...state.items.map(todo => {
                        return (todo.id === payload.id) ?
                            {...payload} : todo
                    })
                    ] 
            }
        case GET_COUNT:
            return {
                ...state,
                numOfTodos: payload
            }
        default: return state;
    }
};

export default TodosReducer;  