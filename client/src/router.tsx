import { createBrowserRouter } from 'react-router';
import Home from './view/pages/Home/Home';
import LoginRegister from './view/pages/loginRegister/LoginRegister';
import AdminPanel from './view/pages/adminPanel/AdminPanel';
import Company from './view/pages/company/Company';
import SetFlights from './view/pages/setFlights/SetFlights';

function ErrorBoundary() {
	return (
		<div className="error-container">
			<h2>Oops! Something went wrong</h2>
			<p>We couldn't find the page you're looking for.</p>
		</div>
	);
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginRegister />,
		errorElement: <ErrorBoundary />
	},
	{
		path: 'home',
		element: <Home />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: 'company',
		element: <Company />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'admin-panel',
				element: <AdminPanel />,
			},
			{
				path: 'set-flights',
				element: <SetFlights />,
			}
		],
	},
]);