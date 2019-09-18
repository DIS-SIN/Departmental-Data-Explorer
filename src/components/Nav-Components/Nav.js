import React from 'react';
import Container from '@material-ui/core/Container';
import MobileDrawer from './MobileDrawer';
import CSPS from '../../static/FIPs/csps_logo.svg';
import styles from './Nav.css';

function NavLink(props) {
	return (
		<a
			className={props.active ? styles.active : ''}
			href={props.href}
			>
			{props.label}
		</a>
	);
}

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
							<li><NavLink active={true} href="#" label="Calendar" /></li>
							<li><NavLink active={false} href="#" label="About" /></li>
							<li><NavLink active={false} href="#" label="Home" /></li>
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
