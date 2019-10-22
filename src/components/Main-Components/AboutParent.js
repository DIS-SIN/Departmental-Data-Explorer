import React from 'react';
import About from './About';
import Container from '@material-ui/core/Container';
import Header from '../Nav-Components/Header';
import Nav from '../Nav-Components/Nav';
import Footer from '../Nav-Components/Footer';

function AboutParent(props) {
	return (
		<>
			<Header />
			<Nav />
			<Container>
				<About />
			</Container>
			<Footer />
		</>
	);
}

export default AboutParent;
