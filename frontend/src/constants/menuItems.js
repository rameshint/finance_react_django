import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Loans from '../pages/Loans';
import Collections from '../pages/Collections';
import Login from '../pages/Login';

export const menuItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: 'bi bi-speedometer2',
    element: <Dashboard />,
    hide : false,
  },
  {
    label: 'Customers',
    path: '/customers',
    icon: 'bi bi-people-fill',
    element: <Customers />,
    hide : false,
  },
  {
    label: 'Loans',
    path: '/loans',
    icon: 'bi bi-cash-stack',
    element: <Loans />,
    hide : false,
  },
  {
    label: 'Collections',
    path: '/collections',
    icon: 'bi bi-wallet2',
    element: <Collections />,
    hide : false,
  },
  {
    label: 'Login',
    path: '/login',
    icon: 'bi bi-wallet2',
    element: <Login />,
    hide : true,
  },
];
