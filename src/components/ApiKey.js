import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments, getCounts, incrementIndex, updateApiKey, updateCourseCode } from '../actions/comment-actions';

class ApiKey extends Component {
	onSubmit = (e) => {
		e.preventDefault();
		this.props.onIncrementIndex('general');
		this.props.onGetComments(this.props.apiKey, this.props.courseCode, this.props.currentIndices.general);
		this.props.onGetCounts(this.props.apiKey, this.props.courseCode);
	}
	
	onUpdateApiKey = (e) => {
		this.props.onUpdateApiKey(e.target.value);
	}
	
	onUpdateCourseCode = (e) => {
		this.props.onUpdateCourseCode(e.target.value);
	}
	
	render() {
		return (
			<>
				<form onSubmit={this.onSubmit}>
					<input type="text" value={this.props.courseCode} onChange={this.onUpdateCourseCode} placeholder="Course Code"/>
					<input type="text" value={this.props.apiKey} onChange={this.onUpdateApiKey} placeholder="Registhor API Key"/>
					<button type="submit">Load Comments</button>
				</form>
			</>
		);
	}
}

// mapStateToProps i.e. assign parts of state to component's props
const mapStateToProps = (state) => {
	return {
		apiKey: state.commentReducer.apiKey,
		courseCode: state.commentReducer.courseCode,
		currentIndices: state.commentReducer.currentIndices
	};
}

// mapActionsToProps i.e. call actions from within component without using 'dispatch'
const mapActionsToProps = {
	onGetComments: getComments,
	onGetCounts: getCounts,
	onIncrementIndex: incrementIndex,
	onUpdateApiKey: updateApiKey,
	onUpdateCourseCode: updateCourseCode
};

export default connect(mapStateToProps, mapActionsToProps)(ApiKey);
