import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

import Dashboard from '../containers/Dashboard/Dashboard';
import Settings from '../containers/Settings/Settings';


const sidebarRoutes = [
    {
        name: 'Dashboard',
        path: '/',
        icon: DashboardIcon,
        component: Dashboard
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: SettingsIcon,
        component: Settings
    },
]

export default sidebarRoutes;