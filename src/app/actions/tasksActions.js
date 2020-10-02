import { FETCH_TASKS, NEW_TASK } from '../actions/types';

const data = [
    {task: 'Coding', scheduled_at: '10:30 pm', date: '29/09/2020', status: 'Not Started'},
    {task: 'Watch video', scheduled_at: '10:30 pm', date: '29/09/2020', status: 'Completed'},
    {task: 'Review Codes', scheduled_at: '10:30 pm', date: '29/09/2020', status: 'Paused'},
    {task: 'Make calls', scheduled_at: '10:30 pm', date: '29/09/2020', status: 'Completed'}
];

export const fetchTasks = () => dispatch => {
    dispatch({
        type: FETCH_TASKS,
        payload: data
    });
    // fetch('https://jsonplaceholder.typicode.com/posts')
    // .then(res => res.json())
    // .then(data => dispatch({
    //     type: FETCH_POSTS,
    //     payload: data
    // }));
};

export const createTask = (data) => dispatch => {
    dispatch({
        type: NEW_TASK,
        payload: data
    });
    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //     method: 'POST',
    //     headers:{ 'content-type': 'application/json'},
    //     body: JSON.stringify(postData)
    // })
    // .then(res => res.json())
    // .then(post => dispatch({
    //     type: NEW_POST,
    //     payload: post
    // }))
};