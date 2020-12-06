import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../assets/dashboardStyles';
import Table from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import {connect} from 'react-redux';
import {fetchProjects, deleteProject, completeProject, getTilesData} from "../../actions/projectActions";
import Chip from "@material-ui/core/Chip";
import New_Project from "../../components/Forms/New_Project";
import Utils from "../../utils/utils";
import IconTile from "../../components/Tiles/IconTile";
import {red, blue, green} from '@material-ui/core/colors';
import ListIcon from '@material-ui/icons/List';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ScheduleIcon from '@material-ui/icons/Schedule';

const Projects = (props) => {
    const classes = useStyles();

    const [projects, setProjects] = useState([]);
    const [tilesData, setTilesData] = useState({});
    const [open, setOpen] = React.useState(false);
    const [projectData, setProjectData] = React.useState(null);

    const tableColumns = [
        {title: 'Project', field: 'name'},
        {title: 'Client', field: 'client_name'},
        {title: 'Due Date', field: 'due_date', render: rowData => Utils.dateFormat(rowData.due_date)},
        {title: 'Currency', field: 'currency'},
        {title: 'Amount', field: 'amount'},
        {title: 'Balance', field: 'balance'},
        {title: 'Status', field: 'status'}
    ];

    const viewDetails = (evt, rowData) => {
        props.history.push(`/${rowData.id}`);
    };

    useEffect(() => {
        localStorage.removeItem('projectData');
    }, []);

    useEffect(() => {
        props.fetchProjects();
        props.getTilesData();
    }, []);

    useEffect(() => {
        setProjects(props.projects);
    }, [props.projects]);

    useEffect(() => {
        setTilesData(props.tilesData);
    }, [props.tilesData]);

    const markProjectAsComplete = (event, rowData) => {
        if(rowData.status === 'Completed'){
            Utils.displayMessage('error', 'Failed', 'Project has already been marked as completed').then(r => r);
        }else{
            let id = rowData.id;
            let text = "Project will be marked as completed, do you want to continue?";

            Utils.confirmDeleteMessage(text)
                .then((willDelete) => {
                    if (willDelete) {
                        props.completeProject(id, result => {
                            if (result.error) {
                                Utils.displayMessage('error', 'Failed', result.errors[0]).then(r => r);
                            } else {
                                Utils.displayMessage('success', 'Success', result.success).then(r => r);
                            }
                        });
                    }
                });
        }
    };

    const editProject = (event, rowData) => {
        rowData.editing = true;
        setProjectData(rowData);
        setOpen(true);
    };

    const deleteProject = (event, rowData) => {
        let id = rowData.id;
        let text = "Project will be deleted, do you want to continue?";

        Utils.confirmDeleteMessage(text)
            .then((willDelete) => {
                if (willDelete) {
                    props.deleteProject(id, result => {
                        if (result.error) {
                            Utils.displayMessage('error', 'Failed', result.errors[0]).then(r => r);
                        } else {
                            Utils.displayMessage('success', 'Success', result.success).then(r => r);
                        }
                    });
                }
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newProject = () => {
        setOpen(true);
    };

    return projects && (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={3} sm={3} md={4}>
                                <IconTile title='Total Projects' color={red} icon={ListIcon} count={tilesData.total_projects} />
                            </Grid>
                            <Grid item xs={3} sm={3} md={4}>
                                <IconTile title='Completed Projects' color={blue} icon={PlaylistAddCheckIcon} count={tilesData.completed_projects} />
                            </Grid>
                            <Grid item xs={3} sm={3} md={4}>
                                <IconTile title='Due Projects' color={green} icon={ScheduleIcon} count={tilesData.due_projects} />
                            </Grid>
                        </Grid>
                        <Grid>
                            <div style={{padding: '0px 10px', marginBottom: 5, marginTop: 15}}>
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
                                            tooltip: 'Edit Project',
                                            color: 'primary',
                                            onClick: (event, rowData) => editProject(event, rowData)
                                        },
                                        {
                                            icon: () => <IconButton color="primary"
                                                                    aria-label="Mark projects as complete"><DoneIcon/></IconButton>,
                                            tooltip: 'Mark as Complete',
                                            onClick: (event, rowData) => markProjectAsComplete(event, rowData)
                                        },
                                        {
                                            icon: () => <IconButton color="secondary" aria-label="Delete task"><DeleteIcon/></IconButton>,
                                            tooltip: 'Delete Task',
                                            onClick: (event, rowData) => deleteProject(event, rowData)
                                        }
                                    ]}

                                />
                            </div>
                        </Grid>
                    </div>
                    {
                       (projectData || open) ? <New_Project open={open} onClose={handleClose} projectData={(projectData) ? projectData : {}} /> : null
                    }
                </Grid>
            </Grid>
        </div>
    )
};

Projects.propTypes = {
    fetchProjects: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    completeProject: PropTypes.func.isRequired,
    getTilesData: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    projects: state.projects.items,
    tilesData: state.projects.tilesData
});

export default connect(mapStateToProps, {fetchProjects, deleteProject, completeProject, getTilesData})(Projects);
