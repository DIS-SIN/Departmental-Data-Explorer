import React, { Component } from 'react';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import { connect } from 'react-redux';
import { getComments, incrementIndex } from '../../actions/comment-actions';
import styles from './LoadMore.css';

export const STEP_SIZE = 20;

class LoadMore extends Component {
	onClick = (e) => {
		e.preventDefault();
		let { commentType, currentIndices, deptCode, optionalFilters } = this.props;
		this.props.onIncrementIndex(commentType);
		this.props.onGetComments(REGISTHOR_API_KEY, commentType, optionalFilters, deptCode.value, currentIndices);
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
		currentIndices: state.commentReducer.currentIndices,
		deptCode: state.mainReducer.deptCode,
		optionalFilters: state.commentReducer.optionalFilters
	};
}

const mapActionsToProps = {
	onGetComments: getComments,
	onIncrementIndex: incrementIndex
};

export default connect(mapStateToProps, mapActionsToProps)(LoadMore);
