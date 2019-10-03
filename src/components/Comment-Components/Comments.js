import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar from '../../static/img/avatar.png';
import Loader from './Loader';
import LoadMore from './LoadMore';
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
		<div className="col-xs-12 bob-comment">
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
						Sentiment Score:
						<CommentStars stars={props.stars} />
						<span className="comment-date">{props.offering_quarter} {props.offering_fiscal_year}</span>
					</h5>
					{/* User comment */}
					<p>{props.comment_text}</p>
				</div>
			</div>
		</div>
	);
}

class Comments extends Component {
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
			commentArray.push(<LoadMore />);
			return commentArray;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		comments: state.commentReducer.comments,
		commentsPending: state.commentReducer.commentsPending
	};
}

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Comments);
