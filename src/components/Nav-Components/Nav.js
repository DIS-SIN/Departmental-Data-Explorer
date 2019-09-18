import React from 'react';
import Container from '@material-ui/core/Container';
import MobileDrawer from './MobileDrawer';
import CSPS from '../../static/FIPs/csps_logo.svg';
import styles from './Nav.css';

function Nav() {
	return (
		<div className={styles.outerBanner}>
			<div className={styles.mobileNavBar}>
				<MobileDrawer />
			</div>
			
			<Container>
				<div className={styles.banner}>
					<div className={styles.navBar}>
						<ul>
							<li><a href="#">Calendar</a></li>
							<li><a href="#">About</a></li>
							<li><a href="#">Home</a></li>
						</ul>
					</div>
					
					<div className={styles.logos}>
						<img src={CSPS} alt="CSPS Logo" />
						<h1>CSPS Data Explorer</h1>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Nav;
