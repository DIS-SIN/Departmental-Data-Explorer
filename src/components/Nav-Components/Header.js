import React from 'react';
import GoC_EN from '../../static/FIPs/goc_colour_en.svg';
import styles from './Header.css';

function Nav() {
	return (
		<header className={styles.header}>
			<a href="https://www.canada.ca/en.html">
				<img src={GoC_EN} alt="Government of Canada Logo" />
			</a>
			<a className={styles.langButtonDesktop} href="https://www.google.ca">Français</a>
		</header>
	);
}

export default Nav;
