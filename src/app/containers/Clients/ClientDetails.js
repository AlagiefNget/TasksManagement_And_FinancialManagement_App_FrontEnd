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
import {getClient} from '../../actions/clientsActions';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Details = (props) => {
    const classes = useStyles();

    const [client, setClient] = useState(null);

    const rows = [
        {label: 'Name', key: 'name'},
        {label: 'Address', key: 'address'},
        {label: 'Phone', key: 'phone_number'},
        {label: 'Email', key: 'email'},
    ];

    useEffect(() => {
        props.getClient(props.match.params.client_id);
    }, [props.match.params.client_id]);

    useEffect(() => {
        if (props.client) {
            setClient(props.client)
        }
    }, [props.client]);

    return client && (
        <div>
            <div>
                <Button style={{float: 'right'}} variant="contained" color="secondary"
                        onClick={() => props.history.goBack()}>Back</Button>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <h3 style={{textAlign: 'center'}}>Client Details</h3>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell align="left">{row.label}</TableCell>
                                    <TableCell align="left">{client[row.key]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

Details.propTypes = {
    getClient: PropTypes.func.isRequired,
    client: PropTypes.object
};

const mapStateToProps = state => ({
    client: state.clients.item
});

export default connect(mapStateToProps, {getClient})(Details);
