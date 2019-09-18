import React from 'react';
import './static/App.css';
import Container from '@material-ui/core/Container';
import Header from './components/Nav-Components/Header';
import Nav from './components/Nav-Components/Nav';



import ApiKey from './components/Comment-Components/ApiKey';
import Comments from './components/Comment-Components/Comments';
import Counts from './components/Comment-Components/Counts';


import Footer from './components/Nav-Components/Footer';

function App() {
	return (
		<>
			<Header />
			<Nav />
			
			<Container>
				<ApiKey />
				<Counts />
				<Comments />
			</Container>
			
			<Footer />
		</>
	);
}

export default App;
