import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({});
const persistConfig = {
	key: 'root',
	storage,
};

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistReducers,
	composeEnhancers(applyMiddleware(thunk), applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store);
sagaMiddleware.run(rootSagas);

export { store, persistor };
