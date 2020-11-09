import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import { Card, Grid } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { connect } from 'react-redux';
import { createTodo } from '../../actions/todosActions';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
    }
  },
}));

const TaskForm = (props) => {
    const classes = useStyles();

    const [task, setTask] = useState({
        task: '',
        scheduled_at: '',
        date: '',
        status: ''
    });

    const getToday = () =>{

        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();

        if(dd < 10){
            dd = '0'+dd;
        }
        if(mm < 10){
            mm = '0'+mm;
        }
        return yyyy+"-"+mm+"-"+dd;
    };

    const status = [
        {label: 'Not started', value: 'Not started'},
        {label: 'In progress', value:'In progress'},
        {label: 'Paused', value: 'Paused'},
        {label: 'Completed', value: 'Completed'}
    ];

    useEffect(() => {
        let _task = {...task};
        _task.status = status[0].value;
        _task.date = getToday();

        setTask(_task);
        // return () => {
        //     console.log('Cleaning up');
        // }
    }, []);

    const handleChange = (e) => {
        let _task = {...task};
        _task[e.target.name] = e.target.value;

        setTask(_task);
    };

    const cancelNewTask = () => {
        props.history.goBack();
    };

    const addNewTask = () => {
        props.createTodo(task);
        // props.history.push('/');
    };

  return (
            <Card>        
                <div>
                    <form className={classes.root} autoComplete="off">
                        <h2 style={{textAlign: 'center'}}>Add Task</h2>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField 
                                    id="task" 
                                    name="task" 
                                    label="Task" 
                                    variant="outlined"
                                    value={task.task} 
                                    onChange={e => handleChange(e)} 
                                />
                                <TextField 
                                    id="date" 
                                    name="date" 
                                    label="Date" 
                                    variant="outlined"
                                    value={task.date} 
                                    onChange={e => handleChange(e)} 
                                    type="date" 
                                />
                                <TextField 
                                    id="scheduled_at" 
                                    name="scheduled_at" 
                                    label="Scheduled At" 
                                    type="time" 
                                    variant="outlined" 
                                    value={task.scheduled_at} 
                                    onChange={e => handleChange(e)} 
                                    defaultValue="07:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                                <TextField
                                        required
                                        id="status"
                                        name="status"
                                        select
                                        label="Status"
                                        value={task.status}
                                        onChange={e => handleChange(e)}
                                        variant="outlined"
                                        style={{
                                            border: 0,
                                            outline: 0
                                        }}
                                    >
                                        {status.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>                        
                            </Grid>
                            <Button variant="contained" color="secondary" style={{margin: 5}} onClick={cancelNewTask}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" style={{margin: 5}} onClick={addNewTask}>
                                Save
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Card>
  );
};

TaskForm.propTypes = {
    createTodo: PropTypes.func.isRequired
};

export default connect(null, { createTodo })(TaskForm);