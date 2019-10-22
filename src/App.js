import React from 'react';
import './static/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AboutParent from './components/Main-Components/AboutParent';
import AppParent from './components/Main-Components/AppParent';
import CalendarParent from './components/Calendar-Components/CalendarParent';
import HomeParent from './components/Main-Components/HomeParent';
import NotFound from './components/Main-Components/NotFound';
import Splash from './components/Main-Components/Splash';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Splash} />
				<Route exact path="/en/about" component={AboutParent} />
				<Route exact path="/en/calendar" component={CalendarParent} />
				<Route exact path="/en/department-page" component={AppParent} />
				<Route exact path="/en/home" component={HomeParent} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
