import React, { Component } from 'react';
import { connect } from 'react-redux';
import tooltip from '../static/img/tooltip.png';

class Bar extends Component {
	render() {
		return (
			<tr>
				<td className="col-xs-2 text-center">{this.props.label}</td>
				<td className="col-xs-10">
					<a href="">
						<span className="bar-fill" style={{ width: `${this.props.width}%`, 'transition': 'width 450ms ease-in-out' }}></span>
						<span>{this.props.percentage}%</span>
					</a>
				</td>
			</tr>
		);
	}
}

class Counts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scaledWidths: {
				oneStarScaled: 0,
				twoStarScaled: 0,
				threeStarScaled: 0,
				fourStarScaled: 0,
				fiveStarScaled: 0
			},
			percentages: {
				percentOne: 0,
				percentTwo: 0,
				percentThree: 0,
				percentFour: 0,
				percentFive: 0
			},
			title: ''
		};
	}
	
	calculateScaledWidths = (counts) => {
		// Destructure 'counts' object
		let { '1': oneStar, '2': twoStar, '3': threeStar, '4': fourStar, '5': fiveStar} = counts;
		// Get largest length and use to scale counts to bar widths
		let upperBound = Math.max(oneStar, twoStar, threeStar, fourStar, fiveStar) * 1.4;
		// Account for 0 comments
		upperBound = (upperBound) ? upperBound : 1;
		let scaledWidths = {
			oneStarScaled: Math.round((oneStar / upperBound) * 100) || 0,
			twoStarScaled: Math.round((twoStar / upperBound) * 100) || 0,
			threeStarScaled: Math.round((threeStar / upperBound) * 100) || 0,
			fourStarScaled: Math.round((fourStar / upperBound) * 100) || 0,
			fiveStarScaled: Math.round((fiveStar / upperBound) * 100) || 0
		};
		return scaledWidths;
	}
	
	calculatePercentages = (counts) => {
		// Destructure 'counts' object
		let { '1': oneStar, '2': twoStar, '3': threeStar, '4': fourStar, '5': fiveStar} = counts;
		let totalComments = oneStar + twoStar + threeStar + fourStar + fiveStar;
		// Account for 0 comments
		let totalCommentsDivisor = (totalComments) ? totalComments : 1;
		// Multiply then divide by ten as JS built-in Math.round doesn't support rounding to 1 decimal
		let percentages = {
			percentOne: Math.round((oneStar / totalCommentsDivisor) * 100 * 10) / 10 || 0,
			percentTwo: Math.round((twoStar / totalCommentsDivisor) * 100 * 10) / 10 || 0,
			percentThree: Math.round((threeStar / totalCommentsDivisor) * 100 * 10) / 10 || 0,
			percentFour: Math.round((fourStar / totalCommentsDivisor) * 100 * 10) / 10 || 0,
			percentFive: Math.round((fiveStar / totalCommentsDivisor) * 100 * 10) / 10 || 0
		};
		return percentages;
	}
	
	getTitle = (counts) => {
		// Destructure 'counts' object
		let { '1': oneStar, '2': twoStar, '3': threeStar, '4': fourStar, '5': fiveStar} = counts;
		let totalComments = (oneStar + twoStar + threeStar + fourStar + fiveStar) || 0;
		let titleNoun = (totalComments === 1) ? 'Comment' : 'Comments';
		let title = `${totalComments} ${titleNoun} in Total`;
		return title;
	}
	
	componentWillReceiveProps(nextProps) {
		let scaledWidths = this.calculateScaledWidths(nextProps.counts);
		let percentages = this.calculatePercentages(nextProps.counts);
		let title = this.getTitle(nextProps.counts);
		this.setState({
			scaledWidths: scaledWidths,
			percentages: percentages,
			title: title
		});
	}
	
	render() {
		return (
			<table className="stars-bar-chart">
				<thead>
					<tr>
						<td colSpan="2">
							<h3 className="stars-bar-title">
								<span>{this.state.title}</span>
								<img className="computed-score-tooltip inline-tooltip" src={tooltip} alt="Tooltip" />
							</h3>
						</td>
					</tr>
				</thead>
				<tbody>
					<Bar label="Five" width={this.state.scaledWidths.fiveStarScaled} percentage={this.state.percentages.percentFive} />
					<Bar label="Four" width={this.state.scaledWidths.fourStarScaled} percentage={this.state.percentages.percentFour} />
					<Bar label="Three" width={this.state.scaledWidths.threeStarScaled} percentage={this.state.percentages.percentThree} />
					<Bar label="Two" width={this.state.scaledWidths.twoStarScaled} percentage={this.state.percentages.percentTwo} />
					<Bar label="One" width={this.state.scaledWidths.oneStarScaled} percentage={this.state.percentages.percentOne} />
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		counts: state.commentReducer.counts,
		countsPending: state.commentReducer.countsPending
	};
}

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Counts);
