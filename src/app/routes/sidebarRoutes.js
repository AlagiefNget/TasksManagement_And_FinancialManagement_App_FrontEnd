import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import Dashboard from '../containers/Dashboard/Dashboard';
import Settings from '../containers/Settings/Settings';
import ExpenseTracker from '../containers/ExpenseTracker/ExpenseTracker';
import Clients from "../containers/Clients/Clients";
import Tasks from "../containers/Tasks/Tasks";
import Projects from "../containers/Projects/Projects";


const sidebarRoutes = [
    {
        name: 'Dashboard',
        path: '/',
        icon: DashboardIcon,
        component: Dashboard
    },
    {
        name: 'Tasks',
        path: '/tasks',
        icon: AssignmentIcon,
        component: Tasks
    },
    {
        name: 'Projects',
        path: '/projects',
        icon: WorkIcon,
        component: Projects
    },
    {
        name: 'Clients',
        path: '/clients',
        icon: PeopleAltIcon,
        component: Clients
    },
    {
        name: 'Expenses',
        path: '/expense-manager',
        icon: AccountBalanceWalletIcon,
        component: ExpenseTracker
    },
    {
        name: 'Income',
        path: '/income-manager',
        icon: MoneyOffIcon,
        component: ExpenseTracker
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: SettingsIcon,
        component: Settings
    },
];

export default sidebarRoutes;
