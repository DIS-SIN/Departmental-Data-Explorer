import React from 'react';
import Container from '@material-ui/core/Container';
import Header from '../Nav-Components/Header';
import Nav from '../Nav-Components/Nav';
import Footer from '../Nav-Components/Footer';

// Add header, footer, and navbar to a component
const withNav = (WrappedComponent) => {
	function WithNav(props) {
		return (
			<>
				<Header />
				<Nav />
				<Container>
					<WrappedComponent {...props} />
				</Container>
				<Footer />
			</>
		);
	}
	return WithNav;
}

export default withNav;
