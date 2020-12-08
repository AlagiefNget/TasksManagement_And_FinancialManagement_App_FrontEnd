import {NEW_CHARGE} from './types';
import $ from "jquery";
import cookies from 'react-cookies';

export const createCharge = (data, callback) => dispatch => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/charges',
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        data: data,
        success: function (result) {
            callback(result);
            dispatch({
                type: NEW_CHARGE,
                payload: result.data
            })
        },
        error:function (e) {

        }
    })
};

