import React from 'react';
import Container from '@material-ui/core/Container';
import Canada from '../../static/FIPs/canada_colour.svg';
import styles from './Footer.css';

function Footer() {
	return (
		<footer className={styles.footer}>
			<Container className={styles.footerContainer}>
				<div className={styles.footerContents}>
					<a href="#top">Top of Page</a>
					<img src={Canada} alt="Canada Logo" />
				</div>
			</Container>
		</footer>
	);
}

export default Footer;
