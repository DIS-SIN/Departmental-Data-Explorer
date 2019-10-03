import React from 'react';
import styles from './Loader.css';

function Loader() {
	return (
		<div className={styles.loader}>
			<div className={styles.obj}></div>
			<div className={styles.obj}></div>
			<div className={styles.obj}></div>
			<div className={styles.obj}></div>
			<div className={styles.obj}></div>
			<div className={styles.obj}></div>
			<div className={styles.obj}></div>
			<div className={styles.obj}></div>
		</div>
	);
}

export default Loader;
