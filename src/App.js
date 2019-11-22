import React from 'react';
import './static/App.css';
import { IntlProvider } from 'react-intl';
import { HashRouter, Route, Switch } from 'react-router-dom';
import About from './components/Main-Components/About';
import AppParent from './components/Main-Components/AppParent';
import Calendar from './components/Calendar-Components/Calendar';
import Home from './components/Main-Components/Home';
import Methodology from './components/Main-Components/Methodology';
import NotFound from './components/Main-Components/NotFound';
import Splash from './components/Main-Components/Splash';
import withNav from './components/HOCs/withNav';

function App() {
	return (
		<IntlProvider locale="en">
			<HashRouter>
				<Switch>
					<Route exact path="/" component={Splash} />
					<Route exact path="/en/about" component={withNav(About)} />
					<Route exact path="/en/calendar" component={withNav(Calendar)} />
					<Route exact path="/en/department-page" component={withNav(AppParent)} />
					<Route exact path="/en/home" component={withNav(Home)} />
					<Route exact path="/en/methodology" component={withNav(Methodology)} />
					<Route component={withNav(NotFound)} />
				</Switch>
			</HashRouter>
		</IntlProvider>
	);
}

export default App;
