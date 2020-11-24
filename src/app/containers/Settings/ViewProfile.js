import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {Card, Grid} from '@material-ui/core';
import { updateUser } from '../../actions/usersActions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import cookies from 'react-cookies';
import Utils from '../../utils/utils';

const styles = (theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

class ViewProfile extends React.Component {
    state = {
        currentUser: {
            first_name: '',
            last_name: '',
            email: '',
        }
    };

    handleChange = e => {
        let val = e.target.value;
        let _currentUser = {...this.state.currentUser};

        _currentUser[e.target.name] = val;
        this.setState({
            currentUser: _currentUser
        });
    };

    goBack = () => {
        this.props.history.goBack();
    };

    updateData = () => {

        this.props.updateUser({user: this.state.currentUser}, result => {
            if(result.error){
                Utils.displayMessage('error','Failed', result.errors[0]);
            }else{
                Utils.displayMessage('success','Success', result.success);
                cookies.save('currentUser', result.user);
                this.setState({
                    currentUser: {...result.user}
                });
            }
        });
    };

    loadUser = () => {
        this.setState({
            currentUser: {...cookies.load('currentUser')}
        });
    };

    componentDidMount() {
        this.loadUser();
    };

    render() {
        const {classes} = this.props;
        let current_user = this.state.currentUser;
        return (
            <div>
                <Card>
                    <div style={{marginLeft: 150}}>
                        <form className={classes.root} autoComplete="on">
                            <h4>Update Details</h4>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        id="first_name"
                                        name="first_name"
                                        label="First Name"
                                        variant="outlined"
                                        value={current_user.first_name}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <TextField
                                        id="last_name"
                                        name="last_name"
                                        label="Last Name"
                                        variant="outlined"
                                        value={current_user.last_name}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        value={current_user.email}
                                        onChange={e => this.handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <div style={{padding: 5}}>
                        <Button variant="contained" color="primary" onClick={this.updateData} style={{margin: 5}}>
                            Update
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}

ViewProfile.propTypes = {
    updateUser: PropTypes.func.isRequired,
};

export default connect(null, { updateUser})(withStyles(styles)(ViewProfile));
