import React from 'react';
import Comments from './Comments';
import Container from '@material-ui/core/Container';
import Header from '../Nav-Components/Header';
import Nav from '../Nav-Components/Nav';
import Footer from '../Nav-Components/Footer';

function CommentsParent() {
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

export default CommentsParent;
