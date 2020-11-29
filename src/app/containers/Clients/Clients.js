import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import useStyles from '../../assets/dashboardStyles';
import Table from 'material-table';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import {connect} from 'react-redux';
import Utils from '../../utils/utils';
import New_Client from "../../components/Forms/New_Client";
import {deleteClient, fetchClients} from "../../actions/clientsActions";

const Clients = (props) => {
    const classes = useStyles();

    const [clients, setClients] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [clientData, setClientData] = React.useState(null);

    const tableColumns = [
        {title: 'Name', field: 'name'},
        {title: 'Phone', field: 'phone_number'},
        {title: 'Email', field: 'email'},
        {title: 'Address', field: 'address'}
    ];

    const handleClose = () => {
        setOpen(false);
    };

    const viewDetails = (evt, rowData) => {
        props.history.push(`${props.match.url}/${rowData.id}`);
    };

    useEffect(() => {
        localStorage.removeItem('clientData');
    }, []);

    useEffect(() => {
        props.fetchClients();
    }, []);

    useEffect(() => {
        setClients(props.clients);
    }, [props.clients]);

    useEffect(() => {
        if (props.newTodo) {
            props.clients.unshift(props.newTodo);
        }
    }, [props.newTodo]);

    const deleteClient = (event, rowData) => {
        let id = rowData.id;

        let text = "Client will be deleted, do you want to continue?";
        Utils.confirmDeleteMessage(text)
            .then((willDelete) => {
                if (willDelete) {
                    props.deleteClient(id, result => {
                        if (result.error) {
                            Utils.displayMessage('error', 'Failed', result.errors[0]);
                        } else {
                            Utils.displayMessage('success', 'Success', result.success);
                        }
                    });
                }
            });
    };

    const editTodo = (event, rowData) => {
        setClientData(rowData);
        setOpen(true);
    };

    const newClient = () => {
        setOpen(true);
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div>
                        <div style={{padding: '0px 10px', marginBottom: 5}}>
                            <Chip color="primary" label="New Client" style={{marginRight: 5}}
                                  onClick={newClient}/>
                        </div>
                        <div>
                            <Table
                                style={{padding: 9}}
                                title="Clients"
                                columns={tableColumns}
                                data={clients}
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
                                    pageSize: 5, actionsColumnIndex: -1
                                }}
                                actions={[
                                    {
                                        icon: () => <IconButton color="default"
                                                                aria-label="Edit task"><EditIcon/></IconButton>,
                                        tooltip: 'Edit Task',
                                        color: 'primary',
                                        onClick: (event, rowData) => editTodo(event, rowData)
                                    },
                                    {
                                        icon: () => <IconButton color="secondary"
                                                                aria-label="Delete client"><DeleteIcon/></IconButton>,
                                        tooltip: 'Delete Client',
                                        onClick: (event, rowData) => deleteClient(event, rowData)
                                    }
                                ]}

                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
            {
                (clientData && open) ? <New_Client open={open} onClose={handleClose} clientData={clientData} /> : null
                // (open) ? <New_Client open={open} onClose={handleClose} clientData={clientData}/> : null
            }
        </Container>
    )
};

Clients.propTypes = {
    fetchClients: PropTypes.func.isRequired,
    clients: PropTypes.array.isRequired,
    // newTodo: PropTypes.object,
    deleteClient: PropTypes.func,
    // editTodo: PropTypes.func
};

const mapStateToProps = state => ({
    clients: state.clients.items,
    // newTodo: state.clients.item
});

export default connect(mapStateToProps, {fetchClients, deleteClient})(Clients);
