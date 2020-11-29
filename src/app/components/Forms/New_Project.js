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

const ProjectForm = (props) => {
    const classes = useStyles();

    const [project, setProject] = useState({
        name: '',
        client: '',
        due_date: '',
        amount: '',
        balance: '',
        status: ''
    });

    useEffect(() => {
        if(props.projectData !== undefined){
            localStorage.setItem('projectData', JSON.stringify(props.projectData));
        }
    }, []);

    useEffect(() => {
        let _project;
        if(localStorage.getItem('projectData') !== null){
            _project = JSON.parse(localStorage.getItem('projectData'));
        }else{
            _project = {..._project};
            _project.status = Utils.status[0].value;
            _project.due_date = Utils.getToday();
        }
        setProject(_project);
    }, []);

    const handleChange = (e) => {
        let _project = {...project};
        _project[e.target.name] = e.target.value;

        setProject(_project);
    };

    const addNewTask = () => {
        if(project.id){
            props.editTodo(project, result => {
                if(result.error){
                    Utils.displayMessage('error','Failed', result.errors[0]);
                }else{
                    Utils.displayMessage('success','Success', result.success);
                    props.getTodoCount();
                }
            });
        }else{
            props.createTodo(project, result => {
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
                {/*{(props.projectData) ? "Edit Task" : "New Task"}*/}
                New Project
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Task"
                    variant="outlined"
                    value={project.name}
                    onChange={e => handleChange(e)}
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    id="client"
                    name="client"
                    label="Task"
                    variant="outlined"
                    value={project.client}
                    onChange={e => handleChange(e)}
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    id="due_date"
                    name="due_date"
                    label="Date"
                    variant="outlined"
                    value={project.due_date}
                    onChange={e => handleChange(e)}
                    type="due_date"
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    required
                    id="status"
                    name="status"
                    select
                    label="Status"
                    value={project.status}
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

ProjectForm.propTypes = {
    // createTodo: PropTypes.func.isRequired
    createTodo: PropTypes.func
};

export default connect(null, { createTodo, editTodo, getTodoCount, fetchTodos })(ProjectForm);
// export default connect(null, { createTodo, editTodo, getTodoCount, fetchTodos })(ProjectForm);
