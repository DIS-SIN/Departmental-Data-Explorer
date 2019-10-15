import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments, getCounts, incrementIndex } from '../../actions/comment-actions';
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
		starsArray.push(<span className={"glyphicon glyphicon-star " + styles.glyphiconStar}></span>);
	}
	for (let i = 0; i < emptyStars; i++) {
		starsArray.push(<span className={"glyphicon glyphicon-star-empty " + styles.glyphiconStarEmpty}></span>);
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
						{/* User comment */}
						<p>{this.props.comment_text}</p>
					</div>
				</div>
			</div>
		);
	}
}

class Comments extends Component {
	componentDidMount() {
		this.props.onGetCounts(REGISTHOR_API_KEY, this.props.courseCode, this.props.deptCode.value);
		this.props.onGetComments(REGISTHOR_API_KEY, this.props.courseCode, this.props.deptCode.value, this.props.currentIndices.general);
		this.props.onIncrementIndex('general');
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.comments.length !== this.props.comments.length;
	}
	
	render() {
		let commentArray = this.props.comments.map((comment) => {
			return <Comment {...comment} />;
		});
		return (
			<>
				<StarsBarchart />
				<div>{commentArray}</div>
				<LoadMore />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		comments: state.commentReducer.comments,
		commentsPending: state.commentReducer.commentsPending,
		counts: {},
		countsPending: false,
		courseCode: state.commentReducer.courseCode,
		currentIndices: state.commentReducer.currentIndices,
		deptCode: state.mainReducer.deptCode
	};
}

const mapActionsToProps = {
	onGetComments: getComments,
	onGetCounts: getCounts,
	onIncrementIndex: incrementIndex
};

export default connect(mapStateToProps, mapActionsToProps)(Comments);
