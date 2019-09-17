import React from 'react';
import './static/App.css';
import Container from '@material-ui/core/Container';
import Header from './components/Nav-Components/Header';
import ApiKey from './components/Comment-Components/ApiKey';
import Comments from './components/Comment-Components/Comments';
import Counts from './components/Comment-Components/Counts';
import Footer from './components/Nav-Components/Footer';

function App() {
	return (
		<Container>
			<Header />
			<ApiKey />
			<Counts />
			<Comments />
			<Footer />
		</Container>
	);
}

export default App;
