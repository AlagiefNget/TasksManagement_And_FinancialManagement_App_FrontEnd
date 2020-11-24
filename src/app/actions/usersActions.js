import { NEW_USER, LOGIN_USER, UPDATE_USER, RESET_PASSWORD } from './types';
import $ from "jquery";
import cookies from 'react-cookies';

export const createUser = (userData, callback) => dispatch => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/users',
        data: userData,
        success: function (result) {
            callback(result);
            dispatch({
                type: NEW_USER,
                payload: result.user
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};

export const updateUser = (userData, callback) => dispatch => {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:3000/api/v1/users/'+userData.user.id,
        headers: {"Authorization": "Bearer " + cookies.load("token")},
        data: userData,
        success: function (result) {
            callback(result);
            dispatch({
                type: UPDATE_USER,
                payload: result.user
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};

export const resetPassword = (userData, callback) => dispatch => {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:3000/api/v1/users/reset_password',
        headers: {"Authorization": "Bearer " + cookies.load("token")},
        data: {user: userData.user, user_id: userData.user.id},
        success: function (result) {
            callback(result);
            dispatch({
                type: RESET_PASSWORD,
                payload: result.user
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};

export const LoginUser = (credentials, callback) => dispatch => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/authenticate',
        data: credentials,
        success: function (result) {
            callback(result);
            dispatch({
                type: LOGIN_USER,
                payload: result
            })
        },
        error:function (e) {
            console.log(e)
        }
    })
};
