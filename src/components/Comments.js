import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar from '../static/img/avatar.png';
import LoadMore from './LoadMore';

class Loader extends Component {
	render() {
		return (
			<div id="outer-loader">
				<div id="loader">
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
					<div className="obj"></div>
				</div>
			</div>
		);
	}
}

class CommentStars extends Component {
	render() {
		let starsArray = [];
		let solidStars = this.props.stars;
		let outlinedStars = 5 - this.props.stars;
		for (let i = 0; i < solidStars; i++) {
			starsArray.push(<span className="glyphicon glyphicon-star"></span>);
		}
		for (let i = 0; i < outlinedStars; i++) {
			starsArray.push(<span className="glyphicon glyphicon-star-empty"></span>);
		}
		return starsArray;
	}
}

class Comment extends Component {
	render() {
		return (
			<div className="col-xs-12 bob-comment">
				<div className="media">
					{/* User avatar */}
					<a className="thumbnail pull-left hidden-xs">
						<img src={avatar} alt="Avatar" />
					</a>
					<div className="media-body">
						{/* User classification and offering city */}
						<h4>{this.props.learner_classification}, <em>{this.props.offering_city}</em></h4>
						{/* Display sentiment score with stars */}
						<h5>
							Sentiment Score:
							<CommentStars stars={this.props.stars} />
							<span className="comment-date">{this.props.offering_quarter} {this.props.offering_fiscal_year}</span>
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
