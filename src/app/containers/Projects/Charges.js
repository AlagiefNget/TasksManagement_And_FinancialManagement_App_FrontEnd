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
import {createCharge} from "../../actions/chargesActions";
import MenuItem from "@material-ui/core/MenuItem";
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

const ChargesForm = (props) => {
    const classes = useStyles();

    const [charge, setCharge] = useState({
        amount: '',
        discount: '',
        due_date: '',
        currency: '',
        project_id: '',
        client_id: '',
    });

    useEffect(() => {
        console.log('data')
        console.log(props["projectData"])
        console.log('data')
        let _projectData = props["projectData"];
        let  _charge = {...charge};
        _charge.currency = Utils.currencies[0].value;
        _charge.due_date = Utils.getToday();
        _charge.amount = _projectData.amount;
        _charge.client_id = _projectData.client_id;
        _charge.project_id = _projectData.id;
        setCharge(_charge);

    }, []);

    const handleChange = (e) => {
        let _charge = {...charge};
        let val =  e.target.value;
        let name =  e.target.name;

        if((name === 'amount' || name === 'discount') && Utils.isValid(val)){
            Utils.displayMessage("warning", "", "Only numbers allowed").then(r => r);
            return;
        }
        _charge[name] = val;

        setCharge(_charge);
    };

    const addNewCharge = () => {
        if(charge.id){
            props.createCharge(charge, result => {
                if(result.error){
                    Utils.displayMessage('error', 'Failed', result.errors[0]).then(r => r);
                }else{
                    Utils.displayMessage('success', 'Success', result.success).then(r => r);
                    props.getTodoCount();
                }
            });
        }else{
            props.createCharge(charge, result => {
                if(result.error){
                    Utils.displayMessage('error', 'Failed', result.errors[0]).then(r => r);
                }else{
                    Utils.displayMessage('success', 'Success', result.success).then(r => r);
                    // props.oncClose();
                    // props.fetchCharges(result.data.id);
                }
            });
        }
        props.onClose();
    };

    return (
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle>
                {/*{(props.chargeData) ? "Edit Task" : "New Task"}*/}
                New Charge
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    required
                    id="currency"
                    name="currency"
                    select
                    label="Currency"
                    value={charge.currency}
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
                    required
                    id="amount"
                    name="amount"
                    label="Amount"
                    variant="outlined"
                    value={charge.amount}
                    onChange={e => handleChange(e)}
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    id="discount"
                    name="discount"
                    label="Discount"
                    variant="outlined"
                    value={charge.discount}
                    onChange={e => handleChange(e)}
                    fullWidth
                    className={classes.applySpacing}
                />
                <TextField
                    id="due_date"
                    name="due_date"
                    label="Due Date"
                    variant="outlined"
                    value={charge.due_date}
                    onChange={e => handleChange(e)}
                    type="date"
                    fullWidth
                    className={classes.applySpacing}
                />
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={props.onClose} variant="contained" style={{margin: 5, float: 'left'}}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" style={{margin: 5, float: 'left'}} onClick={addNewCharge}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ChargesForm.propTypes = {
    createCharge: PropTypes.func.isRequired
};

export default connect(null, { createCharge})(ChargesForm);
