import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments, incrementIndex } from '../../actions/comment-actions';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
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
		starsArray.push(<span className={"glyphicon glyphicon-star " + styles.glyphiconStar}></span>);
	}
	for (let i = 0; i < emptyStars; i++) {
		starsArray.push(<span className={"glyphicon glyphicon-star-empty " + styles.glyphiconStarEmpty}></span>);
	}
	return starsArray;
}

function Comment(props) {
	return (
		<div className={styles.bobComment}>
			<div className="media">
				{/* User avatar */}
				<a className={"thumbnail pull-left hidden-xs " + styles.avatar}>
					<img src={avatar} alt="Avatar" />
				</a>
				<div className="media-body">
					{/* User classification and offering city */}
					<h4>{props.learner_classification}, <em>{props.offering_city}</em></h4>
					{/* Display sentiment score with stars */}
					<h5>
						<span>Sentiment Score: </span>
						<CommentStars stars={props.stars} />
						<span className={styles.commentDate}>{props.offering_quarter} {props.offering_fiscal_year}</span>
					</h5>
					{/* User comment */}
					<p>{props.comment_text}</p>
				</div>
			</div>
		</div>
	);
}

class Comments extends Component {
	componentDidMount() {
		this.props.onGetComments(REGISTHOR_API_KEY, this.props.courseCode, this.props.currentIndices.general);
	}
	
	render() {
		if(this.props.commentsPending) {
			return (
				<Loader />
			);
		}
		if(!this.props.commentsPending) {
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
}

const mapStateToProps = (state) => {
	return {
		comments: state.commentReducer.comments,
		commentsPending: state.commentReducer.commentsPending,
		courseCode: state.commentReducer.courseCode,
		currentIndices: state.commentReducer.currentIndices
	};
}

const mapActionsToProps = {
	onGetComments: getComments,
	onIncrementIndex: incrementIndex
};

export default connect(mapStateToProps, mapActionsToProps)(Comments);
