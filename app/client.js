import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './components/home';
import Login from './components/login';
import Inscription from './components/inscription';
import authentication from './components/authentication'
import { userHandler } from './actions/actions'

window.axios = require('axios');


if(localStorage.token){
	store.dispatch(userHandler(localStorage.token))
}

render((
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path='/' component={authentication(Home)} />
				<Route path='/login' component={Login} />
				<Route path='/inscription' component={Inscription} />
			</Switch>
		</Router>
	</Provider>
	), document.getElementById('app'))

