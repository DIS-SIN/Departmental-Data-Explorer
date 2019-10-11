import React from 'react';
import Container from '@material-ui/core/Container';
import Header from '../Nav-Components/Header';
import Home from './Home';
import Nav from '../Nav-Components/Nav';
import Footer from '../Nav-Components/Footer';

function HomeParent() {
	return (
		<>
			<Header />
			<Nav />
			<Container>
				<Home />
			</Container>
			<Footer />
		</>
	);
}

export default HomeParent;
