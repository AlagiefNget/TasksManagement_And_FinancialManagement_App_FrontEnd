import {EDIT_PROJECT, FETCH_PROJECTS, NEW_PROJECT, DELETE_PROJECT, COMPLETE_PROJECT, TILES_DATA, GET_PROJECT} from './types';
import $ from "jquery";
import cookies from 'react-cookies';

//This is the action, a plain javascript object. Actions are just events
//The method it is in is the action creator.
// dispatch({
//             type: FETCH_TODOS,
//             payload: result.data
//         })

export const fetchProjects = () => dispatch => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/projects',
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        success: function (result) {
            dispatch({
                type: FETCH_PROJECTS,
                payload: result.projects
            })
        },
        error:function (e) {

        }
    })
};

export const createProject = (projectData, callback) => dispatch => {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/projects',
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        data: projectData,
        success: function (result) {
            callback(result);
            dispatch({
                type: NEW_PROJECT,
                payload: result.data
            })
        },
        error:function (e) {

        }
    })
};

export const editProject = (projectData, callback) => dispatch => {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:3000/api/v1/projects/'+projectData.id,
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        data: projectData,
        success: function (result) {
            callback(result);
            dispatch({
                type: EDIT_PROJECT,
                payload: result.data
            })
        },
        error:function (e) {

        }
    })
};

export const deleteProject = (id, callback) => dispatch => {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/api/v1/projects/'+id,
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        success: function (result) {
            callback(result);
            dispatch({
                type: DELETE_PROJECT,
                payload: id
            })
        },
        error:function (e) {

        }
    })
};

export const completeProject = (id, callback) => dispatch => {
    $.ajax({
        method: 'PUT',
        url: 'http://localhost:3000/api/v1/projects/mark_as_complete',
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        data: {project_id: id},
        success: function (result) {
            callback(result);
            dispatch({
                type: COMPLETE_PROJECT,
                payload: result.project
            })
        },
        error:function (e) {

        }
    })
};

export const getTilesData = () => dispatch => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/projects/get_tiles_data',
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        success: function (result) {
            dispatch({
                type: TILES_DATA,
                payload: result.data
            })
        },
        error:function (e) {

        }
    })
};

export const getProject = (id) => dispatch => {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/projects/'+id,
        headers: {"Authorization": "Bearer " +  cookies.load("token")},
        success: function (result) {
            dispatch({
                type: GET_PROJECT,
                payload: result.data
            })
        },
        error:function (e) {

        }
    })
};
