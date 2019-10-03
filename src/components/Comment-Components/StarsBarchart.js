import React from 'react';
import { connect } from 'react-redux';
import styles from './StarsBarchart.css';

function StarsBarchart(props) {
	let { 1: oneStar, 2: twoStar, 3: threeStar, 4: fourStar, 5: fiveStar } = props.counts;
	
	// Get largest length and use to scale counts to bar widths
	let upperBound = Math.max(fiveStar, fourStar, threeStar, twoStar, oneStar) * 1.4;
	
	// Account for 0 comments
	upperBound = (upperBound) ? upperBound : 1;
	
	// Scale counts to obtain bar width
	let fiveStarScaled = String(Math.round((fiveStar / upperBound) * 100)) + '%';
	let fourStarScaled = String(Math.round((fourStar / upperBound) * 100)) + '%';
	let threeStarScaled = String(Math.round((threeStar / upperBound) * 100)) + '%';
	let twoStarScaled = String(Math.round((twoStar / upperBound) * 100)) + '%';
	let oneStarScaled = String(Math.round((oneStar / upperBound) * 100)) + '%';
	
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
							<span className={styles.barFill} style={{ width: fiveStarScaled }}></span>
							<span></span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">Four</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill} style={{ width: fourStarScaled }}></span>
							<span></span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">Three</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill} style={{ width: threeStarScaled }}></span>
							<span></span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">Two</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill} style={{ width: twoStarScaled }}></span>
							<span></span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">One</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill} style={{ width: oneStarScaled }}></span>
							<span></span>
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	);
}

const mapStateToProps = (state) => {
	return { counts: state.commentReducer.counts };
}

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(StarsBarchart);
