import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header/Header';
import SideBar from '../components/Sidebar/Sidebar';
import useStyles from '../assets/appLayoutStyles';
import { Switch, Route } from 'react-router-dom';
import sidebarRoutes from '../routes/sidebarRoutes';
import NewTask from '../components/Forms/NewTask';
import TaskDetails from '../containers/Dashboard/TaskDetails';


export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
        <CssBaseline />
        
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        
        <SideBar open={open}  handleDrawerClose={handleDrawerClose} routes={sidebarRoutes} />
       
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
        <div className={classes.drawerHeader} />
        <Switch>
          {
            sidebarRoutes.map((route, key) => {
              return <Route exact path={route.path} component={route.component} key={route.key} />
            })
          }
          <Route exact path="/new-task" component={NewTask} />
          <Route exact path="/:todo_id" component={TaskDetails} />
        </Switch>
      </main>
    </div>
  );
}
