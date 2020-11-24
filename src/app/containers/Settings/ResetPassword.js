import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {Grid} from '@material-ui/core';
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Utils from "../../utils/utils";
import * as cookies from "react-cookies";
import {connect} from "react-redux";
import { resetPassword } from '../../actions/usersActions';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

class ResetPassword extends React.Component {
    state = {
        credentials: {
            new_password: '',
            password_confirmation: '',

        },
        showPassword: false,
        showConfirmPassword: false,
    };

    handleChange = e => {
        let val = e.target.value.trim();
        let _credentials = {...this.state.credentials};
        _credentials[e.target.name] = val;
        this.setState({
            credentials: _credentials
        });
    };


    handleClickShowPassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };

    handleClickShowConfirmPassword = () => {
        this.setState(prevState => ({
            showConfirmPassword: !prevState.showConfirmPassword
        }));
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    goBack = () => {
        this.props.history.goBack();
    };

    updateData = () => {
        let data = {...this.state.credentials};
        if (data.new_password !== data.password_confirmation) {
            Utils.displayMessage('error', 'Error', 'Password mismatch!');
            document.getElementById('new_password').focus();
        } else {
            this.props.resetPassword({user: this.state.credentials}, result => {
                if(result.error){
                    Utils.displayMessage('error','Failed', result.errors[0]);
                }else{
                    Utils.displayMessage('success','Success', result.success);
                    cookies.save('currentUser', result.user);
                    this.setState({
                        currentUser: {...result.user}
                    });
                    this.props.history.push('/sign-in');
                }
            });
        }
    };

    loadUser = () => {
        this.setState({
            credentials: {...cookies.load('currentUser')}
        })
    };

    componentDidMount() {
        this.loadUser();
    };

    render() {
        const {classes} = this.props;
        let _credentials = this.state.credentials;

        return (
            <div>
                <div style={{marginLeft: 150}}>
                    <form className={classes.root} autoComplete="on">
                        <h4>Reset Password</h4>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12}>
                                <FormControl className={clsx(classes.margin, classes.textField)} required
                                             style={{marginRight: 7, marginTop: 8}}
                                             variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                    <OutlinedInput
                                        id="new_password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={_credentials.new_password}
                                        name="new_password"
                                        onChange={e => this.handleChange(e)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    onMouseDown={e => this.handleMouseDownPassword(e)}
                                                    edge="end"
                                                >
                                                    {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>
                                <FormControl className={clsx(classes.margin, classes.textField)} required
                                             style={{marginTop: 8}}
                                             variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm
                                        Password</InputLabel>
                                    <OutlinedInput
                                        id="password_confirmation"
                                        type={this.state.showConfirmPassword ? 'text' : 'password'}
                                        value={_credentials.password_confirmation}
                                        name="password_confirmation"
                                        onChange={e => this.handleChange(e)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowConfirmPassword}
                                                    onMouseDown={e => this.handleMouseDownPassword(e)}
                                                    edge="end"
                                                >
                                                    {this.state.showConfirmPassword ? <Visibility/> :
                                                        <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <div style={{padding: 5}}>
                    <Button variant="contained" color="primary" onClick={this.updateData} style={{margin: 5}}>
                        Reset
                    </Button>
                </div>
            </div>
        )
    }
}

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { resetPassword })(withStyles(styles)(ResetPassword)));
