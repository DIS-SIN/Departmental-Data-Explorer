import React from 'react';
import { NavLink } from 'react-router-dom';
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
							<li><NavLink exact to="/en/methodology">Methodology</NavLink></li>
							<li><NavLink exact to="/en/calendar">Calendar</NavLink></li>
							<li><NavLink exact to="/en/about">About</NavLink></li>
							<li><NavLink exact to="/en/home">Home</NavLink></li>
						</ul>
					</div>
					
					<div className={styles.outerLogos}>
						<div className={styles.logos}>
							<img src={CSPS} alt="CSPS Logo" />
							<h1>CSPS Data Explorer</h1>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default Nav;
