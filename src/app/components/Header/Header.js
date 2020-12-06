import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import useStyles from '../../assets/headerStyles';
import Tooltip from '@material-ui/core/Tooltip';
import {useHistory, withRouter} from "react-router-dom";
import {getTodoCount} from '../../actions/todosActions';
import {connect} from 'react-redux';
import New_Task from '../../components/Forms/New_Task';
import New_Project from "../Forms/New_Project";
import New_Client from "../Forms/New_Client";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const Header = (props) => {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [addNewAnchorEl, setAddNewAnchorEl] = useState(null);
  const [todoCount, setTodoCount] = useState(0);

  const [openNewTask, setOpenNewTask] = React.useState(false);
  const [openNewClient, setOpenNewClient] = React.useState(false);
  const [openNewProject, setOpenNewProject] = React.useState(false);


  const handleCloseProject = () => {
    setOpenNewProject(false);
  };

  const handleCloseClient = () => {
    setOpenNewClient(false);
  };

  const handleCloseTask = () => {
    setOpenNewTask(false);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isAddMenuOpen = Boolean(addNewAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddMenuOpen = (event) => {
    setAddNewAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleAddMenuClose = () => {
    setAddNewAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    props.history.push('/edit-profile');
  };

  const handleLogout = () => {
    props.history.push('/sign-in');
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    props.getTodoCount();
  }, []);


  useEffect(() =>{
    setTodoCount(props.numOfTodos);
  },[props.numOfTodos]);

  const newTask = () => {
    setOpenNewTask(true);
    handleAddMenuClose();

  };

  const newProject = () => {
    setOpenNewProject(true);
    handleAddMenuClose();
  };

  const newClient = () => {
    setOpenNewClient(true);
    handleAddMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const addMenuId = 'menu-to-add-new-object';
  const renderAddMenu = (
      <Menu
          anchorEl={addNewAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={addMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isAddMenuOpen}
          onClose={handleAddMenuClose}
      >
        <MenuItem onClick={newTask}>Task</MenuItem>
        <MenuItem onClick={newClient}>Client</MenuItem>
        <MenuItem onClick={newProject}>Project</MenuItem>
      </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={todoCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            className={clsx(classes.menuButton, props.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Tasks Manager
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleAddMenuOpen}
                color="inherit"
            >
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={todoCount} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderAddMenu}

      <New_Task open={openNewTask} onClose={handleCloseTask} />
      <New_Project open={openNewProject} onClose={handleCloseProject} />
      {/*<New_Client open={openNewClient} onClose={handleCloseClient} />*/}
    </div>
  );
};

const mapStateToProps = state => ({
  numOfTodos: state.todos.numOfTodos
});

export default withRouter(connect(mapStateToProps, { getTodoCount })(Header));
