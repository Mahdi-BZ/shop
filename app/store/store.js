import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const initState = {
	isAuthenticated: false,
	user: {}
}

const store = createStore(reducer, initState, applyMiddleware(logger, thunk));

export default store