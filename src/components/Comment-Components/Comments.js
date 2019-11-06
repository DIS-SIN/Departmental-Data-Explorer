import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import { STEP_SIZE } from './LoadMore';
import avatar from '../../static/img/avatar.png';
import Loader from './Loader';
import LoadMore from './LoadMore';
import StarsBarchart from './StarsBarchart';
import styles from './Comments.css';

function CommentStars(props) {
	let starsArray = [];
	let solidStars = props.stars;
	let emptyStars = 5 - props.stars;
	for (let i = 0; i < solidStars; i++) {
		starsArray.push(<span className={"glyphicon glyphicon-star " + styles.glyphiconStar} key={`solidStars-${i}`}></span>);
	}
	for (let i = 0; i < emptyStars; i++) {
		starsArray.push(<span className={"glyphicon glyphicon-star-empty " + styles.glyphiconStarEmpty} key={`emptyStars-${i}`}></span>);
	}
	return starsArray;
}

class Comment extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.comment_text !== this.props.comment_text;
	}
	
	render() {
		return (
			<div className={styles.bobComment}>
				<div className="media">
					{/* User avatar */}
					<a className={"thumbnail pull-left hidden-xs " + styles.avatar}>
						<img src={avatar} alt="Avatar" />
					</a>
					<div className="media-body">
						{/* User classification and offering city */}
						<h4>{this.props.learner_classification}, <em>{this.props.offering_city}</em></h4>
						{/* Sentiment score with stars */}
						<h5>
							<span>Sentiment Score: </span>
							<CommentStars stars={this.props.stars} />
						</h5>
						{/* Course title and offering quarter */}
						<h5>
							<span>{this.props.course_code}</span>
							<span className={styles.commentDate}>{this.props.offering_quarter} {this.props.offering_fiscal_year}</span>
						</h5>
						{/* User comment */}
						<p>{this.props.comment_text}</p>
					</div>
				</div>
			</div>
		);
	}
}

class CommentControls extends Component {
	shouldComponentUpdate() {
		// TODO
		
		
		return true;
	}
	
	render() {
		return (
			<div>
				<div className={styles.filter}>
					<p>Stars: </p>
					<select name="stars" value={this.props.optionalFilters.stars} onChange={this.props.changeInput}>
						<option value="">All</option>
						<option value="5">Five</option>
						<option value="4">Four</option>
						<option value="3">Three</option>
						<option value="2">Two</option>
						<option value="1">One</option>
					</select>
				</div>
				
				<div className={styles.filter}>
					<p>Fiscal Year: </p>
					<select name="fiscalYear" value={this.props.optionalFilters.fiscalYear} onChange={this.props.changeInput}>
						<option value="">All</option>
						<option value="2015-16">2015-16</option>
						<option value="2016-17">2016-17</option>
						<option value="2017-18">2017-18</option>
						<option value="2018-19">2018-19</option>
						<option value="2019-20">2019-20</option>
						<option value="2020-21">2020-21</option>
					</select>
				</div>
			</div>
		);
	}
}

class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			counts: {},
			currentIndex: 0,
			// Flag if Registhor has been called
			initialLoad: false,
			optionalFilters: {
				courseCode: '',
				fiscalYear: '',
				stars: ''
			},
			overwriting: false
		};
	}
	
	changeInput = (e) => {
		e.persist();
		this.setState((state, props) => {
			return {
				optionalFilters: {
					...state.optionalFilters,
					[e.target.name]: e.target.value
				}
			};
		}, () => {
			this.runRegisthorQueries(true);
		});
	}
	
	changeStars = (newStars) => {
		this.setState((state, props) => {
			return {
				optionalFilters: {
					...state.optionalFilters,
					stars: newStars
				}
			};
		}, () => {
			this.getCommentsRegisthor(true);
		});
	}
	
	runRegisthorQueries = (overwrite) => {
		this.getCountsRegisthor();
		this.getCommentsRegisthor(overwrite);
	}
	
	getCountsRegisthor = () => {
		let { commentType, deptCode} = this.props;
		let { courseCode, fiscalYear } = this.state.optionalFilters;
		
		// Ensure fields that could contain accented characters are forced as HTML encoded, else
		// AJAX will fail on IE11
		let url = `https://registhor.da-an.ca/api/v1/comments/counts/${commentType}?key=${REGISTHOR_API_KEY}&course_code=${courseCode}&department_code=${encodeURIComponent(deptCode.value)}&fiscal_year=${fiscalYear}`;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				this.setState({
					counts: data.results
				})
			});
	}
	
	getCommentsRegisthor = (overwrite) => {
		let { commentType, deptCode} = this.props;
		let { courseCode, fiscalYear, stars } = this.state.optionalFilters;
		// If overwriting existing comments, set currentIndex to 0
		let currentIndex = overwrite ? 0 : this.state.currentIndex;
		
		// Ensure fields that could contain accented characters are forced as HTML encoded, else
		// AJAX will fail on IE11
		let url = `https://registhor.da-an.ca/api/v1/comments/text/${commentType}?key=${REGISTHOR_API_KEY}&course_code=${courseCode}&department_code=${encodeURIComponent(deptCode.value)}&fiscal_year=${fiscalYear}&stars=${stars}&limit=${STEP_SIZE}&offset=${currentIndex}`;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				// If argument 'overwrite', replace existing comments and reset index
				// Used when filters are triggered as only want comments that match criteria
				if (overwrite) {
					this.setState({
						comments: data.results,
						currentIndex: 20,
						initialLoad: true,
						overwriting: true
					});
				// Otherwise, append and increment index by STEP_SIZE
				} else {
					this.setState((state, props) => {
						return {
							comments: [
								...state.comments,
								...data.results
							],
							currentIndex: state.currentIndex + STEP_SIZE,
							initialLoad: true,
							overwriting: false
						};
					});
				}
			});
	}
	
	render() {
		// Display loader while awaiting response from Registhor
		if (!this.state.comments.length && !this.state.initialLoad) {
			return (
				<Loader />
			);
		}
		
		// Display message if no feedback
		// Use state.counts rather than state.comments.length so won't be affected by filters
		if (!this.state.counts['1'] && !this.state.counts['2'] && !this.state.counts['3'] && !this.state.counts['4'] && !this.state.counts['5'] && this.state.initialLoad && !this.state.optionalFilters.courseCode && !this.state.optionalFilters.fiscalYear) {
			return (
				<p>Apologies, this department has yet to submit feedback of this type.</p>
			);
		}
		
		let commentArray = this.state.comments.map((comment, index) => {
			return <Comment {...comment} key={`comment-${this.props.commentType}-${index}`} />;
		});
		
		return (
			<>
				<p className={styles.blurb}>{this.props.blurb}</p>
				<StarsBarchart counts={this.state.counts} fiscalYear={this.state.optionalFilters.fiscalYear} changeStars={this.changeStars} />
				<CommentControls changeInput={this.changeInput} optionalFilters={this.state.optionalFilters} />
				<div>{commentArray}</div>
				<LoadMore commentCounts={this.state.comments.length} overwriting={this.state.overwriting} getCommentsRegisthor={this.getCommentsRegisthor} />
			</>
		);
	}
	
	componentDidMount() {
		this.runRegisthorQueries(false);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		// TODO
		
		
		return true;
		// return nextProps.comments.length !== this.props.comments.length;
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		deptCode: state.mainReducer.deptCode
	};
}

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Comments);
