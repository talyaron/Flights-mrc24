import { createBrowserRouter } from 'react-router';
import Home from './view/pages/Home/Home';
import LoginRegister from './view/pages/loginRegister/LoginRegister';
import AdminPanel from './view/pages/adminPanel/AdminPanel';
import Company from './view/pages/company/Company';
import CompanyHome from './view/pages/company/CompanyHome';

export const router = createBrowserRouter([

	
	{
		path: '/login-register',
		element: <LoginRegister />,
	},
	{
		path: 'admin-panel',
		element: <AdminPanel />,
	},
	{
		path: 'company',
		element: <Company />,
		children: [
			{
				index: true,
				element: <CompanyHome />,
			},
			{
				path: 'admin-panel',
				element: <AdminPanel />,
			},
		],
	},
]);