import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Utils from "../../utils/utils";
import {connect} from "react-redux";
import {createTodo, editTodo, getTodoCount, fetchTodos} from "../../actions/todosActions";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";

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
    applySpacing: {
        marginBottom: 10
    }
}));

const TaskForm = (props) => {
    const classes = useStyles();

    const [task, setTask] = useState({
        task: '',
        scheduled_at: '',
        date: '',
        status: ''
    });

    useEffect(() => {
        if(props.taskData !== undefined){
            localStorage.setItem('taskData', JSON.stringify(props.taskData));
        }
    }, []);

    useEffect(() => {
        let _task;
        if(localStorage.getItem('taskData') !== null){
            _task = JSON.parse(localStorage.getItem('taskData'));
        }else{
            _task = {...task};
            _task.status = Utils.status[0].value;
            _task.date = Utils.getToday();
        }
        setTask(_task);
    }, []);

    const handleChange = (e) => {
        let _task = {...task};
        _task[e.target.name] = e.target.value;

        setTask(_task);
    };

    const addNewTask = () => {
        if(task.id){
            props.editTodo(task, result => {
                if(result.error){
                    Utils.displayMessage('error','Failed', result.errors[0]);
                }else{
                    Utils.displayMessage('success','Success', result.success);
                    props.getTodoCount();
                }
            });
        }else{
            props.createTodo(task, result => {
                if(result.error){
                    Utils.displayMessage('error','Failed', result.errors[0]);
                }else{
                    Utils.displayMessage('success','Success', result.success);
                    props.getTodoCount();
                    props.fetchTodos();
                }
            });
        }
        props.onClose();
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle>
                {(props.taskData) ? "Edit Task" : "New Task"}
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    id="task"
                    name="task"
                    label="Task"
                    variant="outlined"
                    value={task.task}
                    onChange={e => handleChange(e)}
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    id="date"
                    name="date"
                    label="Date"
                    variant="outlined"
                    value={task.date}
                    onChange={e => handleChange(e)}
                    type="date"
                    fullWidth
                    className={classes.applySpacing}
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
                    fullWidth
                    className={classes.applySpacing}
                >
                    {Utils.status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={props.onClose} variant="contained" style={{margin: 5, float: 'left'}}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" style={{margin: 5, float: 'left'}} onClick={addNewTask}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

TaskForm.propTypes = {
    createTodo: PropTypes.func.isRequired
};

export default connect(null, { createTodo, editTodo, getTodoCount, fetchTodos })(TaskForm);
