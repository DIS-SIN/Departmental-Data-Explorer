import React from 'react';
import './static/App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import AboutParent from './components/Main-Components/AboutParent';
import CalendarParent from './components/Calendar-Components/CalendarParent';
import CommentsParent from './components/Comment-Components/CommentsParent';
import HomeParent from './components/Main-Components/HomeParent';
import Splash from './components/Main-Components/Splash';

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Splash} />
			<Route exact path="/about" component={AboutParent} />
			<Route exact path="/calendar" component={CalendarParent} />
			<Route exact path="/comments" component={CommentsParent} />
			<Route exact path="/en" component={HomeParent} />
		</BrowserRouter>
	);
}

export default App;
