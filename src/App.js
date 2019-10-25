import React from 'react';
import './static/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './components/Main-Components/About';
import AppParent from './components/Main-Components/AppParent';
import Calendar from './components/Calendar-Components/Calendar';
import Home from './components/Main-Components/Home';
import NotFound from './components/Main-Components/NotFound';
import Splash from './components/Main-Components/Splash';
import withNav from './components/HOCs/withNav';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Splash} />
				<Route exact path="/en/about" component={withNav(About)} />
				<Route exact path="/en/calendar" component={withNav(Calendar)} />
				<Route exact path="/en/department-page" component={withNav(AppParent)} />
				<Route exact path="/en/home" component={withNav(Home)} />
				<Route component={withNav(NotFound)} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
