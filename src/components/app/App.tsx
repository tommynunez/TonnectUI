import React from 'react';
import './App.css';
import {AuthenticatedRoutes,UnauthenticatedRoutes} from '../../shared/route';
import {AuthenticationContextConsumer, AuthenticationProvider} from '../../context/authentication';
import '../../assets/base.scss';

const App = () => {
	return (
		<AuthenticationProvider>
			<AuthenticationContextConsumer>
				{authcontext => authcontext.isAuthenticated && authcontext.checktoken() ? (
					<AuthenticatedRoutes/>
				) : (
					<UnauthenticatedRoutes/>
				)}
			</AuthenticationContextConsumer>
		</AuthenticationProvider>
	);
}

export default App;
