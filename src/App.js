import React from 'react';
import './static/App.css';
import Container from '@material-ui/core/Container';
import Calendar from './components/Calendar-Components/Calendar';
import Header from './components/Nav-Components/Header';
import Nav from './components/Nav-Components/Nav';
import Footer from './components/Nav-Components/Footer';

function App() {
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

export default App;
