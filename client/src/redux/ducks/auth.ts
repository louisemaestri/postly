import { get } from 'lodash';
import { ReduxAction } from '../../types/reduxAction';

// Types

export const types = {
	USER_LOGIN: 'app/auth/USER_LOGIN',
	USER_LOGIN_INFORMATION: 'app/auth/USER_LOGIN_INFORMATION',
	USER_LOGIN_INFORMATION_FAILED: 'app/auth/USER_LOGIN_INFORMATION_FAILED',
	USER_LOGIN_INFORMATION_SUCCESS: 'app/auth/USER_LOGIN_INFORMATION_SUCCESS',
	USER_LOGOUT: 'app/auth/USER_LOGOUT',
};

// Actions

export const actions = {
	setLoginUser: (data: any): ReduxAction => ({
		payload: data,
		type: types.USER_LOGIN,
	}),
	setUserLoginInformation: (): ReduxAction => ({
		type: types.USER_LOGIN_INFORMATION,
	}),
	setUserLoginInformationFailed: (data: any): ReduxAction => ({
		payload: data,
		type: types.USER_LOGIN_INFORMATION_FAILED,
	}),
	setUserLoginInformationSuccess: (data: any): ReduxAction => ({
		payload: data,
		type: types.USER_LOGIN_INFORMATION_SUCCESS,
	}),
	setUserLogout: (): ReduxAction => ({
		type: types.USER_LOGOUT,
	}),
};

// Reducers

const INITIAL_STATE = {
	accessToken: null,
	clientId: null,
	error: null,
	isAuthenticated: false,
	lastAuth: null,
	tokenType: null,
	user: {
		isAdmin: false,
	},
};

const authReducer = (state = INITIAL_STATE, action: ReduxAction) => {
	switch (action.type) {
		case types.USER_LOGIN_INFORMATION:
			return state;
		case types.USER_LOGIN:
			return {
				...state,
				accessToken: get(action, 'payload.accessToken'),
				clientId: get(action, 'payload.clientId'),
				isAuthenticated: true,
				tokenType: get(action, 'payload.tokenType'),
			};
		case types.USER_LOGIN_INFORMATION_SUCCESS:
			return {
				...state,
				user: {
					email: get(action, 'payload.email'),
					isAdmin: get(action, 'payload.isAdmin', true),
					name: get(action, 'payload.name'),
					solverId: get(action, 'payload.solverId'),
				},
			};
		case types.USER_LOGIN_INFORMATION_FAILED:
			return state;
		case types.USER_LOGOUT:
			return {
				...state,
				...INITIAL_STATE,
			};
		default:
			return state;
	}
};

export default authReducer;
