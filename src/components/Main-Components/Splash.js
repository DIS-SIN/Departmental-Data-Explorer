import React from 'react';
import Canada from '../../static/FIPs/canada_colour.svg';
import GoC_EN from '../../static/FIPs/goc_colour_en.svg';
import styles from './Splash.css';

function Splash() {
	return (
		<div className={styles.splashScreen}>
			<div className={styles.splashScreenWindow}>
				<img className={styles.FIP} alt="Government of Canada / Gouvernement du Canada" src={GoC_EN} />
				<div className={styles.languageButtonsBox}>
					<a href="#"><button>English</button></a>
					<a href="#"><button>Français</button></a>
				</div>
				<div className={styles.footer}>
					<div className={styles.termsBox}>
						<a href="https://www.canada.ca/en/transparency/terms.html">Terms &amp; conditions</a>
						<span className={styles.separator}>&bull;</span>
						<a href="https://www.canada.ca/fr/transparence/avis.html">Avis</a>
					</div>
					<img alt="Symbol of the Government of Canada / Symbole du gouvernement du Canada" src={Canada} />
				</div>
			</div>
		</div>
	);
}

export default Splash;
