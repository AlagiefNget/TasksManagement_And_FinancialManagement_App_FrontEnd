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

import { fetchTodos, deleteTodo, editTodo, completeTodo, getTodoCount } from '../../actions/todosActions';
import { connect } from 'react-redux';
import Utils from '../../utils/utils';
import New_Task from "../../components/Forms/New_Task";

const Tasks = (props) => {
    const classes = useStyles();

    const [colors, setColors] = useState({
        all_color: 'primary',
        postponed_color: '',
        completed_color: '',
    });

    const [tableTitle, setTableTitle] = useState('All Tasks');
    const [view, setView] = useState('All')
    const[todos, setTodos] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [taskData, setTaskData] = React.useState(null);

    const tableColumns = [
        {title: 'Task', field: 'task'},
        // {title: 'Scheduled At', field: 'scheduled_at', render: rowData => Utils.getTime(rowData.scheduled_at)},
        {title: 'Date', field: 'date'},
        {title: 'Status', field: 'status'}
    ];

    const handleClose = () => {
        setOpen(false);
    };
    const getAllTasks = () => {
        let _colors = {...colors};
        _colors.all_color = 'primary';
        _colors.postponed_color = '';
        _colors.completed_color = '';

        setColors(_colors);
        setTableTitle('All Tasks');
        setView('All');
        setTodos(props.todos);
    };

    const getPostponedTasks = () => {
        let _colors = {...colors};
        _colors.all_color = '';
        _colors.postponed_color = 'primary';
        _colors.completed_color = '';

        let _temp = [...props.todos];
        let _todos = _temp.filter(todo => todo.status === 'Paused');
        setColors(_colors);
        setTableTitle('Cancelled/Postponed Tasks');
        setView('Paused');
        setTodos(_todos);
    };

    const getCompletedTasks = () => {
        let _colors = {...colors};
        _colors.all_color = '';
        _colors.postponed_color = '';
        _colors.completed_color = 'primary';

        let _temp = [...props.todos];
        let _todos = _temp.filter(todo => todo.status === 'Completed');
        setColors(_colors);
        setTableTitle('Completed Tasks');
        setView('Completed');
        setTodos(_todos);
    };

    const viewDetails = (evt, rowData) => {
        props.history.push(`/${rowData.id}`);
    };

    useEffect(() => {
        localStorage.removeItem('taskData');
    }, []);

    useEffect(()=> {
        props.fetchTodos();
    }, []);

    useEffect(()=> {
        setTodos(props.todos);
    }, [props.todos]);

    useEffect(() =>{
        if(props.newTodo){
            props.todos.unshift(props.newTodo);
        }
    },[props.newTodo]);

    const deleteTask = (event, rowData) => {
        let id = rowData.id;
        let response = window.confirm('Task will be deleted.');
        if(response){
            props.deleteTodo(id, result => {
                if(result.error){
                    Utils.displayMessage('error','Failed', result.errors[0]);
                }else{
                    setTodos(todos.filter(todo => todo.id !== id));
                    Utils.displayMessage('success','Success', result.success);
                    props.getTodoCount();
                }
            });
        }
    };

    const markTaskAsComplete = (event, rowData) => {
        let id = rowData.id;
        let response = window.confirm('Task will be marked as completed.');
        if(response){
            props.completeTodo(id, result => {
                if(result.error){
                    Utils.displayMessage('error','Failed', result.errors[0]);
                }else{
                    Utils.displayMessage('success','Success', result.success);
                    props.getTodoCount();
                }
            });
        }
    };

    const editTodo = (event, rowData) => {
        setTaskData(rowData);
        setOpen(true);
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
                                data={todos}
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
                                    pageSize: 5,actionsColumnIndex: -1,
                                    rowStyle: view === 'All' ? rowData => ({
                                        backgroundColor: (rowData.status === 'Completed') ? '#CCC' : '#FFF',
                                    }) : () => ({
                                        backgroundColor: '#FFF',
                                    })
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
                                        onClick: (event, rowData) => markTaskAsComplete(event, rowData)
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
            {
                (taskData && open) ? <New_Task open={open} onClose={handleClose} taskData={taskData} /> : null
            }
        </Container>
    )
};

Tasks.propTypes = {
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

export default connect(mapStateToProps, { fetchTodos, deleteTodo, editTodo, completeTodo, getTodoCount })(Tasks);
