import { FETCH_TODOS, NEW_TODO, DELETE_TODO, GET_TODO, UPDATE_TODO, COMPLETE_TODO, GET_COUNT } from './types';
import $ from "jquery";
import Utils from '../utils/utils';

export const fetchTodos = () => dispatch => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3006/api/v1/todos',
        success: function (result) {
            dispatch({
                type: FETCH_TODOS,
                payload: result.data
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};

export const createTodo = (todoData, callback) => dispatch => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3006/api/v1/todos',
        data: todoData,
        success: function (result) {
            callback(result);
            dispatch({
                type: NEW_TODO,
                payload: result.task
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};

export const deleteTodo = (id, callback) => dispatch => {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3006/api/v1/todos/'+id,
        success: function (result) {
            callback(result);
            dispatch({
                type: DELETE_TODO,
                payload: id
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};

export const getTodo = (id) => dispatch => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3006/api/v1/todos/'+id,
        success: function (result) {
            dispatch({
                type: GET_TODO,
                payload: result.task
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};

export const editTodo = (todo, callback) => dispatch => {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:3006/api/v1/todos/'+todo.id,
        data: todo,
        success: function (result) {
            callback(result)
            dispatch({
                type: UPDATE_TODO,
                payload: result.task
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};

export const completeTodo = (id, callback) => dispatch => {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:3006/api/v1/todos/mark_as_complete',
        data: {todo_id: id},
        success: function (result) {
            callback(result);
            dispatch({
                type: COMPLETE_TODO,
                payload: result.task
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};

export const getTodosCount = () => dispatch => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3006/api/v1/todos/get_todos_count',
        success: function (result) {
            dispatch({
                type: GET_COUNT,
                payload: result._count
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};

