import {combineReducers } from 'redux';
import TodosReducer from './todosReducer';
import UsersReducer from './usersReducer';
import ProjectsReducer from "./projectsReducer";
import ClientsReducer from "./clientsReducer";


export default combineReducers({
    todos: TodosReducer,
    users: UsersReducer,
    projects: ProjectsReducer,
    clients: ClientsReducer
})
