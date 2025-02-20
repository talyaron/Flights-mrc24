import { createBrowserRouter } from 'react-router';
import Home from './view/pages/Home/Home';
import LoginRegister from './view/pages/loginRegister/LoginRegister';
import AdminPanel from './view/pages/adminPanel/AdminPanel';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login-register',
		element: <LoginRegister />,
	},
	{
		path: 'admin-panel',
		element: <AdminPanel />,
	}
]);