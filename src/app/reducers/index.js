import {combineReducers } from 'redux';
import TodosReducer from './todosReducer';


export default combineReducers({
    todos: TodosReducer
})