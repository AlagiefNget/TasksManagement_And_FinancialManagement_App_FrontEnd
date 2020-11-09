import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container";
import useStyles from '../../assets/dashboardStyles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Table from 'material-table';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import { fetchTodos, deleteTodo, editTodo } from '../../actions/todosActions';
import { connect } from 'react-redux';

const Dashboard = (props) => {
    const classes = useStyles();

    const [colors, setColors] = useState({
        all_color: 'primary',
        postponed_color: '',
        completed_color: '',
    });

    const [tableTitle, setTableTitle] = useState('All Tasks');

    const tableColumns = [
        {title: 'Task', field: 'task'},
        {title: 'Scheduled At', field: 'scheduled_at'},
        {title: 'Date', field: 'date'},
        {title: 'Status', field: 'status'}
    ];

    const getAllTasks = () => {
        let _colors = {...colors};
        _colors.all_color = 'primary';
        _colors.postponed_color = '';
        _colors.completed_color = '';

        setColors(_colors);
        setTableTitle('All Tasks');
    };

    const getPostponedTasks = () => {
        let _colors = {...colors};
        _colors.all_color = '';
        _colors.postponed_color = 'primary';
        _colors.completed_color = '';

        setColors(_colors);
        setTableTitle('Cancelled/Postponed Tasks');
    };

    const getCompletedTasks = () => {
        let _colors = {...colors};
        _colors.all_color = '';
        _colors.postponed_color = '';
        _colors.completed_color = 'primary';

        setColors(_colors);
        setTableTitle('Completed Tasks');
    };

    const viewDetails = (evt, rowData) => {
        props.history.push(`/${rowData.id}`);
        console.log(rowData)
    };

    useEffect(()=> {
        props.fetchTodos();
    }, []);

    useEffect(() =>{
        if(props.newTodo){
            props.todos.unshift(props.newTodo);
        }
    },[props.newTodo]);

    const deleteTask = (event, rowData) => {
        let response = window.confirm('Task will be deleted.');
        if(response){
            props.deleteTodo(rowData.id);
        }
    };

    const editTodo = (event, rowData) => {
        props.editTodo(rowData.id);
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div>   
                        <div style={{padding: '0px 10px', marginBottom: 5}}>
                            <Chip color={colors.all_color} label="All" style={{marginRight: 5}} onClick={getAllTasks}/>
                            <Chip color={colors.postponed_color} label="Postponed" style={{marginRight: 5}} onClick={getPostponedTasks}/>
                            <Chip color={colors.completed_color} label="Completed" style={{marginRight: 5}} onClick={getCompletedTasks}/>
                        </div>
                        <div>
                            <Table
                                style={{padding: 9}}
                                title={tableTitle}
                                columns={tableColumns}
                                data={props.todos}
                                onRowClick={viewDetails}
                                localization={{
                                    header:{
                                        actions: ''
                                    }
                                }}
                                options={{
                                    exportButton: false, filtering: false,
                                    grouping: false, sorting: true,
                                    debounceInterval: 1000,
                                    selection: false, showTitle: true,
                                    pageSize: 5,actionsColumnIndex: -1
                                }}
                                actions={[
                                    {
                                        icon: () => <IconButton color="default" aria-label="Edit task"><EditIcon /></IconButton>,
                                        tooltip: 'Edit Task',
                                        color: 'primary',
                                        onClick: (event, rowData) => editTodo(event, rowData)
                                    },
                                    {
                                        icon: () => <IconButton color="primary" aria-label="Mark task as complete"><DoneIcon /></IconButton>,
                                        tooltip: 'Mark as Complete',
                                        onClick: (event, rowData) => alert(JSON.stringify(rowData))
                                    },
                                    {
                                        icon: () => <IconButton color="secondary" aria-label="Delete task"><DeleteIcon /></IconButton>,
                                        tooltip: 'Delete Task',
                                        onClick: (event, rowData) => deleteTask(event, rowData)
                                    }
                                ]}
                            
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

Dashboard.propTypes = {
    fetchTodos: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    newTodo: PropTypes.object,
    deleteTodo: PropTypes.func,
    editTodo: PropTypes.func
};

const mapStateToProps = state => ({
    todos: state.todos.items,
    newTodo: state.todos.item
});

export default connect(mapStateToProps, { fetchTodos, deleteTodo, editTodo })(Dashboard);