import React from 'react';
import Container from '@material-ui/core/Container';
import GoC_EN from '../../static/FIPs/goc_colour_en.svg';
import GitHub from '../../static/img/github.svg';
import styles from './Header.css';

function Nav() {
	return (
		<Container>
			<header className={styles.header}>
				<a href="https://www.canada.ca/en.html">
					<img src={GoC_EN} alt="Government of Canada Logo" />
				</a>
				<div>
					<a className={styles.langButtonDesktop} href="#">Français</a>
					<a className={styles.gitHubLink} href="https://github.com/DIS-SIN/Departmental-Data-Explorer">
						<img src={GitHub} alt="GitHub" />
					</a>
				</div>
			</header>
		</Container>
	);
}

export default Nav;
