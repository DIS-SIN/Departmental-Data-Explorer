import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments, incrementIndex } from '../actions/comment-actions';

export const STEP_SIZE = 20;

class LoadMore extends Component {
	onClick = (e) => {
		e.preventDefault();
		this.props.onIncrementIndex('general');
		this.props.onGetComments(this.props.apiKey, this.props.courseCode, this.props.currentIndices.general);
	}
	
	render() {
		return (
			<div className="more-button-outer">
				<button onClick={this.onClick} className="btn btn-primary more-button">Load More</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		apiKey: state.commentReducer.apiKey,
		courseCode: state.commentReducer.courseCode,
		currentIndices: state.commentReducer.currentIndices
	};
}

const mapActionsToProps = {
	onGetComments: getComments,
	onIncrementIndex: incrementIndex
};

export default connect(mapStateToProps, mapActionsToProps)(LoadMore);
