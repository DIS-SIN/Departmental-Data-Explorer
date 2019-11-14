import React, { Component } from 'react';
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
	
	onClick = () => {
		this.props.getCommentsRegisthor(false);
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		let buttonDisabled = ((nextProps.commentCounts - prevState.commentCounts) < 20) && !nextProps.overwriting ? true: false;
		return {
			buttonDisabled: buttonDisabled,
			commentCounts: nextProps.commentCounts
		};
	}
	
	render() {
		return (
			<div className={styles.loadMoreOuter}>
				{this.state.buttonDisabled ? <p>End of Comments</p> : null}
				<button onClick={this.onClick} className={'btn btn-primary ' + styles.myBtn} disabled={this.state.buttonDisabled}>Load More</button>
			</div>
		);
	}
}

export default LoadMore;
