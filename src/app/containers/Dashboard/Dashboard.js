import React, { useState } from 'react';
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

const Dashboard = (props) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [colors, setColors] = useState({
        all_color: 'primary',
        postponed_color: '',
        completed_color: '',
    });

    const [tableTitle, setTableTitle] = useState('All Tasks');

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
        console.log('props '+JSON.stringify(props));
        console.log('rowdata '+JSON.stringify(rowData));

        props.history.push(`${props.match.path}/${rowData.tableData.id}`)
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
                                columns={[
                                    {title: 'Task', field: 'task'},
                                    {title: 'Scheduled At', field: 'scheduled_at'},
                                    {title: 'Date', field: 'date'},
                                    {title: 'Status', field: 'status'}
                                ]}
                                data={[
                                    {task: 'Coding', scheduled_at: '10:30 pm', date: '29/09/2020', status: 'Not Started'},
                                    {task: 'Watch video', scheduled_at: '10:30 pm', date: '29/09/2020', status: 'Completed'},
                                    {task: 'Review Codes', scheduled_at: '10:30 pm', date: '29/09/2020', status: 'Paused'},
                                    {task: 'Make calls', scheduled_at: '10:30 pm', date: '29/09/2020', status: 'Completed'},
                                    {task: 'Reading', scheduled_at: '10:30 pm', date: '29/09/2020', status: 'In Progress'},
                                    {task: 'Cooking', scheduled_at: '10:30 pm', date: '29/09/2020', status: 'Not Started'},
                                ]}
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
                                        onClick: (event, rowData) => alert(JSON.stringify(rowData))
                                    },
                                    {
                                        icon: () => <IconButton color="primary" aria-label="Mark task as complete"><DoneIcon /></IconButton>,
                                        tooltip: 'Mark as Complete',
                                        onClick: (event, rowData) => alert(JSON.stringify(rowData))
                                    },
                                    {
                                        icon: () => <IconButton color="secondary" aria-label="Delete task"><DeleteIcon /></IconButton>,
                                        tooltip: 'Delete Task',
                                        onClick: (event, rowData) => alert('yoww '+JSON.stringify(rowData))
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

export default Dashboard;