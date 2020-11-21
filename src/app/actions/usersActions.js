import { NEW_USER, LOGIN_USER } from './types';
import $ from "jquery";

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
