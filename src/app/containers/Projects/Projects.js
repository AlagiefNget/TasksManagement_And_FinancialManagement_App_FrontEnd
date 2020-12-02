import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import useStyles from '../../assets/dashboardStyles';
import Table from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import {connect} from 'react-redux';
import {fetchProjects} from "../../actions/projectActions";
import Chip from "@material-ui/core/Chip";
import New_Project from "../../components/Forms/New_Project";

const Projects = (props) => {
    const classes = useStyles();

    const [projects, setProjects] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [taskData, setTaskData] = React.useState(null);

    const tableColumns = [
        {title: 'Project', field: 'name'},
        {title: 'Client', field: 'client_name'},
        {title: 'Due Date', field: 'due_date'},
        {title: 'Amount', field: 'amount'},
        {title: 'Balance', field: 'balance'},
        {title: 'Status', field: 'status'}
    ];

    const viewDetails = (evt, rowData) => {
        props.history.push(`/${rowData.id}`);
    };

    useEffect(() => {
        localStorage.removeItem('taskData');
    }, []);

    useEffect(() => {
        props.fetchProjects();
    }, []);

    useEffect(() => {
        setProjects(props.projects);
    }, [props.projects]);

    useEffect(() => {
        if (props.newTodo) {
            props.projects.unshift(props.newTodo);
        }
    }, [props.newTodo]);

    // const deleteTask = (event, rowData) => {
    //     let id = rowData.id;
    //     let response = window.confirm('Task will be deleted.');
    //     if (response) {
    //         props.deleteTodo(id, result => {
    //             if (result.error) {
    //                 Utils.displayMessage('error', 'Failed', result.errors[0]);
    //             } else {
    //                 setProjects(projects.filter(todo => todo.id !== id));
    //                 Utils.displayMessage('success', 'Success', result.success);
    //                 props.getTodoCount();
    //             }
    //         });
    //     }
    // };
    //
    // const markTaskAsComplete = (event, rowData) => {
    //     let id = rowData.id;
    //     let response = window.confirm('Task will be marked as completed.');
    //     if (response) {
    //         props.completeTodo(id, result => {
    //             if (result.error) {
    //                 Utils.displayMessage('error', 'Failed', result.errors[0]);
    //             } else {
    //                 Utils.displayMessage('success', 'Success', result.success);
    //                 props.getTodoCount();
    //             }
    //         });
    //     }
    // };
    //
    // const editTodo = (event, rowData) => {
    //     setTaskData(rowData);
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const newProject = () => {
        setOpen(true);
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div>
                        <div style={{padding: '0px 10px', marginBottom: 5}}>
                            <Chip color="primary" label="New Project" style={{marginRight: 5}}
                                  onClick={newProject}/>
                        </div>
                        <div>
                            <Table
                                style={{padding: 9}}
                                title={"Projects"}
                                columns={tableColumns}
                                data={projects}
                                onRowClick={viewDetails}
                                localization={{
                                    header: {
                                        actions: ''
                                    }
                                }}
                                options={{
                                    exportButton: false, filtering: false,
                                    grouping: false, sorting: true,
                                    debounceInterval: 1000,
                                    selection: false, showTitle: true,
                                    pageSize: 5, actionsColumnIndex: -1,
                                }}
                                actions={[
                                    {
                                        icon: () => <IconButton color="default"
                                                                aria-label="Edit task"><EditIcon/></IconButton>,
                                        tooltip: 'Edit Task',
                                        color: 'primary',
                                        // onClick: (event, rowData) => editTodo(event, rowData)
                                    },
                                    {
                                        icon: () => <IconButton color="primary"
                                                                aria-label="Mark task as complete"><DoneIcon/></IconButton>,
                                        tooltip: 'Mark as Complete',
                                        // onClick: (event, rowData) => markTaskAsComplete(event, rowData)
                                    },
                                    {
                                        icon: () => <IconButton color="secondary" aria-label="Delete task"><DeleteIcon/></IconButton>,
                                        tooltip: 'Delete Task',
                                        // onClick: (event, rowData) => deleteTask(event, rowData)
                                    }
                                ]}

                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
            {
                // (clientData || open) ? <New_Project open={open} onClose={handleClose} clientData={(clientData) ? clientData : {}} /> : null
                (open) ? <New_Project open={open} onClose={handleClose}/> : null
            }
        </Container>
    )
};

Projects.propTypes = {
    fetchTodos: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    projects: state.projects.items,
});

export default connect(mapStateToProps, {fetchProjects})(Projects);
