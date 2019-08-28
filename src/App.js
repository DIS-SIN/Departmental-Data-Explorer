import React from 'react';
import './static/App.css';
import Container from '@material-ui/core/Container';
import Nav from './components/Nav';
import ApiKey from './components/ApiKey';
import Comments from './components/Comments';
import Counts from './components/Counts';

function App() {
	return (
		<Container>
			<Nav />
			<ApiKey />
			<Counts />
			<Comments />
		</Container>
	);
}

export default App;
