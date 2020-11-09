import { FETCH_TODOS, NEW_TODO, DELETE_TODO, GET_TODO, UPDATE_TODO } from './types';
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

export const createTodo = (todoData) => dispatch => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3006/api/v1/todos',
        data: todoData,
        success: function (result) {
            // alert('Task successfully added.');
            Utils.displayMessage('success','Successful', result.success);
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

export const deleteTodo = (id) => dispatch => {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3006/api/v1/todos/'+id,
        success: function (result) {
            alert('Task successfully deleted.');
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

export const editTodo = (todo) => dispatch => {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:3006/api/v1/todos/'+todo.id,
        data: todo,
        success: function (result) {
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

