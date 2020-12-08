import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {getProject} from '../../actions/projectActions';
import ChargesForm from "./Charges";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const projects_rows = [
    {label: "Name", key: "name"},
    {label: "Due Date", key: "due_date"},
    {label: "Client", key: "client_name"},
    {label: "Status", key: "status"},
    {label: "Amount (GMD)", key: "amount"},
    {label: "Balance (GMD)", key: "balance"},
];


const ProjectDetails = (props) => {
    const classes = useStyles();

    const [projectData, setProjectData] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        props.getProject(props.match.params.project_id);
    }, [props.match.params.project_id]);

    useEffect(() => {
        if (props.project) {
            setProjectData(props.project)
        }
    }, [props.project]);

    const goBack = () => {
        props.history.goBack();
    };

    const closeNewCharge = () => {
        setOpen(false);
    };

    const newCharge = () => {
        setOpen(true);
    };

    return projectData && (
        <div>
            <div>
                <Button style={{marginBottom:7}} variant="contained" color="primary"
                        onClick={newCharge}>Add Charge
                </Button>
                <Button style={{float: 'right', marginBottom:7}} variant="contained" color="secondary"
                        onClick={goBack}>Back
                </Button>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <h3 style={{textAlign: 'center'}}>Project Details</h3>
                        <TableBody>
                            {
                                projects_rows.map(row => (
                                    <TableRow>
                                        <TableCell>{row.label}</TableCell>
                                        <TableCell>{projectData[row.key]}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {
                (open) ? <ChargesForm open={open} onClose={closeNewCharge} projectData={projectData} /> : null
            }
        </div>
    );
};

ProjectDetails.propTypes = {
    getProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.projects.item
});

export default connect(mapStateToProps, {getProject})(ProjectDetails);
