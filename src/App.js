import React from 'react';
import './static/App.css';
import Container from '@material-ui/core/Container';
import Comments from './components/Comment-Components/Comments';
import Header from './components/Nav-Components/Header';
import Nav from './components/Nav-Components/Nav';
import Footer from './components/Nav-Components/Footer';

function App() {
	return (
		<>
			<Header />
			<Nav />
			<Container>
				<Comments />
			</Container>
			<Footer />
		</>
	);
}

export default App;
