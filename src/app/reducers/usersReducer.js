import { NEW_USER, LOGIN_USER } from '../actions/types';

const initialState = {
    user: {},
};

const UsersReducer = (state = initialState, { type, payload }) => {
    switch(type){
        // case FETCH_USER:
        //     return {
        //         ...state,
        //         item: payload
        //     }
        case NEW_USER:
            return {
                ...state,
                user: payload
            };
        case LOGIN_USER:
            return {
                ...state,
                user: payload
            };
        // case UPDATE_USER:
        //     return {
        //         ...state,
        //         items: [
        //             ...state.items.map(todo => {
        //                 return (todo.id === payload.id) ?
        //                     {...payload} : todo
        //             })
        //             ]
        //     }
        default: return state;
    }
};

export default UsersReducer;
