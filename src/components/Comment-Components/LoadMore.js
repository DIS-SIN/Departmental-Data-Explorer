import React, { Component } from 'react';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import { connect } from 'react-redux';
import { getComments, incrementIndex } from '../../actions/comment-actions';
import styles from './LoadMore.css';

export const STEP_SIZE = 20;

class LoadMore extends Component {
	onClick = (e) => {
		e.preventDefault();
		this.props.onIncrementIndex('general');
		this.props.onGetComments(REGISTHOR_API_KEY, this.props.courseCode, this.props.deptCode.value, this.props.currentIndices.general);
	}
	
	render() {
		return (
			<div className={styles.loadMoreOuter}>
				<button onClick={this.onClick} className={'btn btn-primary ' + styles.myBtn}>Load More</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		courseCode: state.commentReducer.courseCode,
		currentIndices: state.commentReducer.currentIndices,
		deptCode: state.mainReducer.deptCode
	};
}

const mapActionsToProps = {
	onGetComments: getComments,
	onIncrementIndex: incrementIndex
};

export default connect(mapStateToProps, mapActionsToProps)(LoadMore);
