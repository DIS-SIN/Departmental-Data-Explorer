import React from 'react';
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
	
	// Add labels showing percentages
	let totalComments = fiveStar + fourStar + threeStar + twoStar + oneStar;
	// Use noun 'comment' if 1 comment, else 'comments'
	let commentsNoun = (totalComments === 1) ? 'Comment' : 'Comments';
	// Account for 0 comments
	let totalCommentsDivisor = (totalComments) ? totalComments : 1;
	// Multiply then divide by ten as JS built-in Math.round doesn't support rounding to 1 decimal
	let percentFive = Math.round((fiveStar / totalCommentsDivisor) * 100 * 10) / 10;
	let percentFour = Math.round((fourStar / totalCommentsDivisor) * 100 * 10) / 10;
	let percentThree = Math.round((threeStar / totalCommentsDivisor) * 100 * 10) / 10;
	let percentTwo = Math.round((twoStar / totalCommentsDivisor) * 100 * 10) / 10;
	let percentOne = Math.round((oneStar / totalCommentsDivisor) * 100 * 10) / 10;
	
	return (
		<table className={styles.starsBarchart}>
			<thead>
				<tr>
					<td colSpan="2">
						<h3>
							<span>{`${totalComments} ${commentsNoun} in Total`}</span>
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
							<span>{percentFive}%</span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">Four</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill} style={{ width: fourStarScaled }}></span>
							<span>{percentFour}%</span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">Three</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill} style={{ width: threeStarScaled }}></span>
							<span>{percentThree}%</span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">Two</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill} style={{ width: twoStarScaled }}></span>
							<span>{percentTwo}%</span>
						</a>
					</td>
				</tr>
				<tr>
					<td className="col-xs-2 text-center">One</td>
					<td className="col-xs-10">
						<a href="">
							<span className={styles.barFill} style={{ width: oneStarScaled }}></span>
							<span>{percentOne}%</span>
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export default StarsBarchart;
