import React from 'react';
import styles from './StarsBarchart.css';

function StarsBarchart(props) {
	return (
		<table className={styles.starsBarchart}>
			<thead>
				<tr>
					<td colSpan="2">
						<h3>
							<span></span>
							{/* Add Material UI tooltip */}
						</h3>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td className="col-xs-2 text-center">Five</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill}></span>
							<span></span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">Four</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill}></span>
							<span></span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">Three</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill}></span>
							<span></span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">Two</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill}></span>
							<span></span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">One</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill}></span>
							<span></span>
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export default StarsBarchart;
