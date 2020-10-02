import { combineReducers } from 'redux';
import { taskReducer } from './tasksReducer';

export default combineReducers({
    tasks: taskReducer
});