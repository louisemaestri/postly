import { combineReducers } from 'redux';
import storage from 'redux-persist/es/storage';
import { ReduxAction } from '../types/reduxAction';
import authReducer, { types as authTypes } from './ducks/auth';

const stateReducer = combineReducers({
	auth: authReducer,
});

const rootReducer = (state: any, action: ReduxAction) => {
	if (action.type === authTypes.USER_LOGOUT) {
		storage.removeItem('persist:root');
		state = undefined;
	}

	return stateReducer(state, action);
};

export default rootReducer;
