import React from 'react';
import './static/App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import CalendarParent from './components/Calendar-Components/CalendarParent';
import CommentsParent from './components/Comment-Components/CommentsParent';
import Splash from './components/Main-Components/Splash';

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Splash} />
			<Route exact path="/calendar" component={CalendarParent} />
			<Route exact path="/comments" component={CommentsParent} />
		</BrowserRouter>
	);
}

export default App;
