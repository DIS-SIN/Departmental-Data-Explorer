import React from 'react';
import styles from './NotFound.css';

function NotFound() {
	return (
		<div className={"jumbotron " + styles.jumbotron}>
			<span className={styles.h1}>Error 404: Page Not Found</span>
		</div>
	);
}

export default NotFound;
