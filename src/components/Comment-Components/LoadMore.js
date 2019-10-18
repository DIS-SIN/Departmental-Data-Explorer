import React, { Component } from 'react';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import { connect } from 'react-redux';
import { getComments } from '../../actions/comment-actions';
import styles from './LoadMore.css';

export const STEP_SIZE = 20;

class LoadMore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonDisabled: false,
			commentCounts: 0
		};
	}
	
	onClick = (e) => {
		e.preventDefault();
		let { commentType, currentIndex, deptCode } = this.props;
		let { courseCode, fiscalYear, stars } = this.props.optionalFilters;
		
		this.props.onGetComments(REGISTHOR_API_KEY, commentType, courseCode, deptCode.value, fiscalYear, stars, currentIndex);
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		let buttonDisabled = ((nextProps.commentCounts - prevState.commentCounts) < 20) ? true: false;
		return {
			buttonDisabled: buttonDisabled,
			commentCounts: nextProps.commentCounts
		};
	}
	
	render() {
		return (
			<div className={styles.loadMoreOuter}>
				{this.state.buttonDisabled ? <p>End of Comments</p> : undefined}
				<button onClick={this.onClick} className={'btn btn-primary ' + styles.myBtn} disabled={this.state.buttonDisabled}>Load More</button>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentIndex: state.commentReducer.currentIndices[ownProps.commentType],
		deptCode: state.mainReducer.deptCode,
		optionalFilters: state.commentReducer.optionalFilters[ownProps.commentType]
	};
}

const mapActionsToProps = {
	onGetComments: getComments,
};

export default connect(mapStateToProps, mapActionsToProps)(LoadMore);
