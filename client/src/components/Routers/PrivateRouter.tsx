import React from 'react';
import { get } from 'lodash';
import { Redirect, Route } from 'react-router-dom';
import { getPassport } from '../../core/auth';

const PrivateRoute = ({ children, ...rest }: any) => {
	const passport = getPassport();
	const isAuthenticated = get(passport, 'isAuthenticated', false);

	return (
		<Route
			{...rest}
			render={() => {
				return isAuthenticated ? children : <Redirect to="/login" />;
			}}
		/>
	);
};

export default PrivateRoute;
