import React from 'react';
import Container from '@material-ui/core/Container';
import Canada from '../../static/FIPs/canada_colour.svg';
import styles from './Footer.css';

function TopOfPage() {
	const onClick = (e) => {
		e.preventDefault();
		window.scrollTo(0, 0);
	}
	
	return (
		<a className={styles.topOfPage} onClick={onClick}>Top of Page</a>
	);
}

function Footer() {
	return (
		<footer className={styles.footer}>
			<Container className={styles.footerContainer}>
				<div className={styles.footerContents}>
					<TopOfPage />
					<img src={Canada} alt="Canada Logo" />
				</div>
			</Container>
		</footer>
	);
}

export default Footer;
