import React from 'react';
import './static/App.css';
import Nav from './components/Nav';
import ApiKey from './components/ApiKey';
import Banner from './components/Banner';
import Comments from './components/Comments';
import Counts from './components/Counts';

function App() {
	return (
		<>
			<Nav />
			<Banner />
			<ApiKey />
			<Counts />
			<Comments />
		</>
	);
}

export default App;
