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
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import {fetchClients} from "../../actions/clientsActions";
import {fetchProjects, createProject, editProject} from "../../actions/projectActions";

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
        client_id: '',
        due_date: '',
        amount: '',
        balance: '',
        status: '',
        currency: ''
    });

    const [clientSelectList, setClientSelectList] = useState([]);

    const clearForm = () => {
        setProject({
            name: '',
            client_id: '',
            due_date: '',
            amount: '',
            balance: '',
            status: '',
            currency: '',
            description: ''
        });
    };


    useEffect(() => {
        props.fetchClients();
        if(props.projectData !== undefined){
            localStorage.setItem('projectData', JSON.stringify(props.projectData));
        }
    }, []);

    useEffect(() => {
        let _clients = [];
        props.clients.map(client => _clients.push({label: client.name, value: client.id}));
        setClientSelectList(_clients);
    }, [props.clients]);

    useEffect(() => {
        let _project;
        if(localStorage.getItem('projectData') !== null){
            _project = {...JSON.parse(localStorage.getItem('projectData'))};
        }else{
            _project = {...project};
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

    const close = () => {
        if (project.editing) {
            setProject({
                id: null,
                name: '',
                client_id: '',
                due_date: '',
                amount: '',
                balance: '',
                status: '',
                currency: '',
                description: '',
            });
        } else {
            clearForm();
        }
        props.onClose();
    };

    const addNewProject = () => {
        if(project.id){
            props.editProject(project, result => {
                if(result.error){
                    Utils.displayMessage('error','Failed', result.errors[0]);
                }else{
                    Utils.displayMessage('success','Success', result.success);
                    props.fetchProjects();
                    close();
                }
            });
        }else{
            props.createProject(project, result => {
                if(result.error){
                    Utils.displayMessage('error','Failed', result.errors[0]);

                }else{
                    if(result.success){
                        Utils.displayMessage('success','Success', result.success);
                        props.fetchProjects();
                        close();
                    }
                }
            });
        }
        props.onClose();
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle>
                {(props.projectData) ? "Edit Project" : "New Project"}
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Project Name"
                    variant="outlined"
                    value={project.name}
                    onChange={e => handleChange(e)}
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    required
                    id="client_id"
                    name="client_id"
                    select
                    label="Client"
                    value={project.client_id}
                    onChange={e => handleChange(e)}
                    variant="outlined"
                    style={{
                        border: 0,
                        outline: 0
                    }}
                    fullWidth
                    className={classes.applySpacing}
                >
                    {clientSelectList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {/*{option.label+" id: "+option.value}*/}
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="due_date"
                    name="due_date"
                    label="Due Date"
                    variant="outlined"
                    value={project.due_date}
                    onChange={e => handleChange(e)}
                    type="date"
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    required
                    id="currency"
                    name="currency"
                    select
                    label="Currency"
                    value={project.currency}
                    onChange={e => handleChange(e)}
                    variant="outlined"
                    style={{
                        border: 0,
                        outline: 0
                    }}
                    fullWidth
                    className={classes.applySpacing}
                >
                    {Utils.currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="amount"
                    name="amount"
                    label="Price"
                    variant="outlined"
                    value={project.amount}
                    onChange={e => handleChange(e)}
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
                <Button variant="contained" color="primary" style={{margin: 5, float: 'left'}} onClick={addNewProject}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ProjectForm.propTypes = {
    fetchClients: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired,
    fetchProjects: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    clients: state.clients.items,
});

export default connect(mapStateToProps, { createProject, editProject, fetchProjects, fetchClients })(ProjectForm);
