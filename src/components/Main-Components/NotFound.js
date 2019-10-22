import React from 'react';
import Container from '@material-ui/core/Container';
import Header from '../Nav-Components/Header';
import Nav from '../Nav-Components/Nav';
import Footer from '../Nav-Components/Footer';
import styles from './NotFound.css';

function NotFound() {
	return (
		<>
			<Header />
			<Nav />
			<Container>
				<div className={"jumbotron " + styles.jumbotron}>
					<span className={styles.h1}>Error 404: Page Not Found</span>
				</div>
			</Container>
			<Footer />
		</>
	);
}

export default NotFound;
