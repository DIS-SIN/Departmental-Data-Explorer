import React from 'react';
import Calendar from './Calendar';
import Container from '@material-ui/core/Container';
import Header from '../Nav-Components/Header';
import Nav from '../Nav-Components/Nav';
import Footer from '../Nav-Components/Footer';

function CalendarParent() {
	return (
		<>
			<Header />
			<Nav />
			<Container>
				<Calendar />
			</Container>
			<Footer />
		</>
	);
}

export default CalendarParent;
