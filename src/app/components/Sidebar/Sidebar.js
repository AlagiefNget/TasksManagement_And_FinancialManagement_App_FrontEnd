import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import useStyles from '../../assets/sidebarStyles'
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
            paper: classes.drawerPaper,
            }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {
            props.routes.map((route, key) => {
              let ItemIcon = route.icon;
              return(
                  <NavLink
                    // exact
                    to={route.path}
                    key={key}
                    className={classes.item}
                  >
                    <ListItem button key={key}>
                      <ListItemIcon>
                        <ItemIcon />
                      </ListItemIcon>
                      <ListItemText primary={route.name} />
                    </ListItem>
                  </NavLink>
              );
            })
          }
        </List>

      </Drawer>
    )
}

export default Sidebar;