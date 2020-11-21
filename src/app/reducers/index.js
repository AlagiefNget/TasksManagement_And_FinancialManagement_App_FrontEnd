import {combineReducers } from 'redux';
import TodosReducer from './todosReducer';
import UsersReducer from './usersReducer';


export default combineReducers({
    todos: TodosReducer,
    users: UsersReducer
})