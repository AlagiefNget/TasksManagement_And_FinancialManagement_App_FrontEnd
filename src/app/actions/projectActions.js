import {FETCH_PROJECTS, NEW_PROJECT} from './types';
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
                payload: result.data
            })
        },
        error:function (e) {
            // console.log(e)
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
            // console.log(e)
        }
    })
};
