import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments, getCounts, resetAll } from '../../actions/comment-actions';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
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

class Comments extends Component {
	render() {
		// Display message if no feedback
		if (!this.props.comments.length) {
			return (
				<p>Apologies, this department has yet to submit feedback of this type.</p>
			);
		}
		
		let commentArray = this.props.comments.map((comment, index) => {
			return <Comment {...comment} key={`comment-${this.props.commentType}-${index}`} />;
		});
		
		return (
			<>
				<StarsBarchart commentType={this.props.commentType} />
				<div>{commentArray}</div>
				<LoadMore commentType={this.props.commentType} commentCounts={this.props.comments.length} />
			</>
		);
	}
	
	componentDidMount() {
		let { commentType, optionalFilters, deptCode, currentIndex } = this.props;
		
		this.props.onGetCounts(REGISTHOR_API_KEY, commentType, optionalFilters.courseCode, deptCode.value);
		this.props.onGetComments(REGISTHOR_API_KEY, commentType, optionalFilters.courseCode, deptCode.value, currentIndex);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.comments.length !== this.props.comments.length;
	}
	
	componentWillUnmount() {
		// Clear all comments, counts, and indices
		// Wouldn't want to e.g. load TBS, read its comments, then load CSPS and see a combination of both
		this.props.onResetAll(this.props.commentType);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		comments: state.commentReducer.comments[ownProps.commentType],
		currentIndex: state.commentReducer.currentIndices[ownProps.commentType],
		deptCode: state.mainReducer.deptCode,
		optionalFilters: state.commentReducer.optionalFilters[ownProps.commentType]
	};
}

const mapActionsToProps = {
	onGetComments: getComments,
	onGetCounts: getCounts,
	onResetAll: resetAll
};

export default connect(mapStateToProps, mapActionsToProps)(Comments);
