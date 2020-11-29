import {FETCH_CLIENTS, NEW_CLIENT, DELETE_CLIENT, GET_CLIENT, UPDATE_CLIENT} from './types';
import $ from "jquery";
import cookies from 'react-cookies';

//This is the action, a plain javascript object. Actions are just events
//The method it is in is the action creator.
// dispatch({
//             type: FETCH_CLIENTS,
//             payload: result.data
//         })

export const fetchClients = () => dispatch => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/clients',
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        success: function (result) {
            dispatch({
                type: FETCH_CLIENTS,
                payload: result.data
            })
        },
        error:function (e) {
            // console.log(e)
        }
    })
};

export const createClient = (clientData, callback) => dispatch => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/clients',
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        data: clientData,
        success: function (result) {
            callback(result)
            dispatch({
                type: NEW_CLIENT,
                payload: result.data
            })
        },
        error:function (e) {
            // console.log(e)
        }
    })
};

export const deleteClient = (id, callback) => dispatch => {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/api/v1/clients/'+id,
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        success: function (result) {
            callback(result);
            if(result.success){
                dispatch({
                    type: DELETE_CLIENT,
                    payload: id
                })
            }
        },
        error:function (e) {
            // console.log(e)
        }
    })
};

export const getClient = (id) => dispatch => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/clients/'+id,
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        success: function (result) {
            if(result.success){
                dispatch({
                    type: GET_CLIENT,
                    payload: result.client
                })
            }
        },
        error:function (e) {
            // console.log(e)
        }
    })
};

export const editClient = (client, callback) => dispatch => {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:3000/api/v1/clients/'+client.id,
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        data: client,
        success: function (result) {
            callback(result);
            dispatch({
                type: UPDATE_CLIENT,
                payload: result.client
            })
        },
        error:function (e) {
            // console.log(e)
        }
    })
};
