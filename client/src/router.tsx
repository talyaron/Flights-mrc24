import { createBrowserRouter } from 'react-router';
import Home from './view/pages/Home/Home';
import LoginRegister from './view/pages/loginRegister/LoginRegister';
import AdminPanel from './view/pages/adminPanel/AdminPanel';
import Company from './view/pages/company/Company';
export const router = createBrowserRouter([
	
	{
		path: '/',
		element: <LoginRegister />,
	},
	
	{
		path: 'company',
		element: <Company />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'admin-panel',
				element: <AdminPanel />,
			},
		],
	},
]);