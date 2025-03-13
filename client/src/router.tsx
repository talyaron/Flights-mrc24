import { createBrowserRouter } from 'react-router';
import LandingPage from './view/pages/landingPage/LandingPage';
import LoginRegister from './view/pages/loginRegister/LoginRegister';
import LoginRegisterPassengers from './view/pages/Home/LoginRegisterPassengers';
import AdminPanel from './view/pages/adminPanel/AdminPanel';
import Company from './view/pages/company/Company';
import CompanyHome from './view/pages/company/companyHome/CompanyHome';
import SetFlights from './view/pages/setFlights/SetFlights';
import FlightActions from './view/pages/company/flightActions/FlightActions';
import AddFlightForm from './view/pages/setFlights/AddFlightForm';
import Home from './view/pages/Home/Home';
import FlightSearchResults from './view/pages/FlightSearchResults/FlightSearchResults';
import FlightDetails from './view/pages/OrderProcess/FlightDetails/FlightDetails';
import PassengersDetails from './view/pages/OrderProcess/PassengersDetails/PassengersDetails';
import OrderConfirmation from './view/pages/OrderProcess/OrderConfirmation/OrderConfirmation';

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
		element: <LandingPage />, 
		errorElement: <ErrorBoundary />
	},
	{
		path: '/employees',
		element: <LoginRegister />,
		errorElement: <ErrorBoundary />
	},
	{
		path: '/customers',
		element: <LoginRegisterPassengers />,
		errorElement: <ErrorBoundary />
	},
	{
		path: 'home',
		element: <Home />,
		errorElement: <ErrorBoundary />,
		children: [
			
		]
	},
	{
		path: 'flight-search-results',
		element: <FlightSearchResults />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: 'booking-flight/:flightId',
		element: <FlightDetails />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: 'passenger-details',
		element: <PassengersDetails />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: 'order-confirmation',
		element: <OrderConfirmation />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: 'company',
		element: <Company />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <CompanyHome />,
			},
			{
				path: 'admin-panel',
				element: <AdminPanel />,
			},
			{
				path: 'set-flights',
				element: <SetFlights />,
			},
			{
				path: 'flight-actions',
				element: <FlightActions />,
			},
			{
				path: 'add-flight',
				element: <AddFlightForm
					onSubmit={(flightData) => console.log(flightData)}
					onCancel={() => console.log('Cancel button clicked')} />,
			}
		],
	},
]);