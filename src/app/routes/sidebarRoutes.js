import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

import Dashboard from '../containers/Dashboard/Dashboard';
import Settings from '../containers/Settings/Settings';
import ExpenseTracker from '../containers/ExpenseTracker/ExpenseTracker';


const sidebarRoutes = [
    {
        name: 'Dashboard',
        path: '/',
        icon: DashboardIcon,
        component: Dashboard
    },
    {
        name: 'Expense Manager',
        path: '/expense-tracker',
        icon: MoneyOffIcon,
        component: ExpenseTracker
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: SettingsIcon,
        component: Settings
    },
]

export default sidebarRoutes;