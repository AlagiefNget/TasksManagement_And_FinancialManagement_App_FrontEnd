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
import {createClient, editClient, fetchClients, getClient} from "../../actions/clientsActions";
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

const ClientForm = (props) => {
    const classes = useStyles();

    const [client, setClient] = useState({
        name: '',
        email: '',
        phone_number: '',
        address: ''
    });

    useEffect(() => {
        if (props.clientData !== undefined || props.clientData !== null) {
            localStorage.setItem('clientData', JSON.stringify(props.clientData));
        }
    }, [props.clientData]);

    useEffect(() => {
        if (localStorage.getItem('clientData') !== null) {
            let _client = JSON.parse(localStorage.getItem('clientData'));
            setClient(_client);
        }
    }, []);

    const handleChange = (e) => {
        let _client = {...client};
        let name = e.target.name;
        let val = e.target.value;
        if (name === 'phone_number' && Utils.isValid(val)) {
            Utils.displayMessage("warning", "", "Only numbers allowed");
            return;
        }
        _client[name] = val;
        setClient(_client);
    };

    const validateFields = () => {
        const {name, phone_number, email} = client;
        if (name === '') return 'name';
        if (phone_number === '') return 'phone_number';
        if (email === '' || !Utils.validateEmail(email)) return 'email';
    };

    const clearForm = () => {
        setClient({
            name: '',
            email: '',
            phone_number: '',
            address: ''
        });
    };

    const setFocus = (field_id) => {
        Utils.displayMessage('error', 'Error', 'Please specify ' + field_id);
        document.getElementById(field_id).focus();
    };

    const close = () => {
        if (client.editing) {
            setClient({
                id: null,
                name: '',
                email: '',
                phone_number: '',
                address: ''
            });
        } else {
            clearForm();
        }
        props.onClose();
    };

    const addClient = () => {
        const validate = validateFields();
        if (validate) {
            setFocus(validate);
            return;
        }
        if (client.id) {
            props.editClient(client, result => {
                if (result.error) {
                    Utils.displayMessage('error', 'Failed', result.errors[0]);
                } else {
                    Utils.displayMessage('success', 'Success', result.success);
                    props.fetchClients();
                    close();
                }
            });
        } else {
            props.createClient(client, result => {
                if (result.error) {
                    Utils.displayMessage('error', 'Failed', result.errors[0]);
                } else {
                    Utils.displayMessage('success', 'Success', result.success);
                    // props.getTodoCount();
                    props.fetchClients();
                    close();
                }
            });
        }

    };

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle>
                {/*{(props.clientData) ? "Edit Task" : "New Task"}*/}
                New Client
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    value={client.name}
                    onChange={e => handleChange(e)}
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={client.email}
                    onChange={e => handleChange(e)}
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    required
                    id="phone_number"
                    name="phone_number"
                    label="Phone Number"
                    variant="outlined"
                    value={client.phone_number}
                    onChange={e => handleChange(e)}
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    id="address"
                    name="address"
                    label="Address"
                    variant="outlined"
                    value={client.address}
                    onChange={e => handleChange(e)}
                    fullWidth
                    className={classes.applySpacing}
                />
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={() => close()} variant="contained"
                        style={{margin: 5, float: 'left'}}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" style={{margin: 5, float: 'left'}} onClick={addClient}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ClientForm.propTypes = {
    createClient: PropTypes.func.isRequired,
    fetchClients: PropTypes.func.isRequired,
    getClient: PropTypes.func.isRequired,
    editClient: PropTypes.func.isRequired
};

export default connect(null, {createClient, fetchClients, getClient, editClient})(ClientForm);
