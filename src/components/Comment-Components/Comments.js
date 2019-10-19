import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import { STEP_SIZE } from './LoadMore';
import avatar from '../../static/img/avatar.png';
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
						{/* Display sentiment score with stars */}
						<h5>
							<span>Sentiment Score: </span>
							<CommentStars stars={this.props.stars} />
							<span className={styles.commentDate}>{this.props.offering_quarter} {this.props.offering_fiscal_year}</span>
						</h5>
						{/* Course title */}
						<h5>{this.props.course_code}</h5>
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
			<>
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
			</>
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
			optionalFilters: {
				courseCode: '',
				fiscalYear: '',
				stars: ''
			}
		}
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
			this.runRegisthorQueries();
		});
	}
	
	runRegisthorQueries = () => {
		this.getCountsRegisthor();
		this.getCommentsRegisthor(true);
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
						currentIndex: 20
					});
				// Otherwise, 
				} else {
					this.setState((state, props) => {
						return {
							comments: [
								...state.comments,
								...data.results
							],
							currentIndex: state.currentIndex + STEP_SIZE
						};
					});
				}
			});
	}
	
	render() {
		// Display message if no feedback
		if (!this.state.comments.length) {
			return (
				<p>Apologies, this department has yet to submit feedback of this type.</p>
			);
		}
		
		let commentArray = this.state.comments.map((comment, index) => {
			return <Comment {...comment} key={`comment-${this.props.commentType}-${index}`} />;
		});
		
		return (
			<>
				<StarsBarchart counts={this.state.counts} />
				<CommentControls changeInput={this.changeInput} optionalFilters={this.state.optionalFilters} />
				<div>{commentArray}</div>
				<LoadMore commentCounts={this.state.comments.length} getCommentsRegisthor={this.getCommentsRegisthor} />
			</>
		);
	}
	
	componentDidMount() {
		this.runRegisthorQueries();
	}
	
	shouldComponentUpdate(nextProps, nextState) {
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
