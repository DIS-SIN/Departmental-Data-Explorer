import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import styles from './MandatoryCourses.css';

class MandatoryCourses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// Flag if Registhor has been called
			initialLoad: false
		}
	}
	
	componentDidMount() {
		this.getCoursesRegisthor();
	}
	
	getCoursesRegisthor = () => {
		// Ensure fields that could contain accented characters are forced as HTML encoded, else
		// AJAX will fail on IE11
		/*
		let url = `https://registhor.da-an.ca/api/v1/registrations/training-locations?key=${REGISTHOR_API_KEY}&department_code=${encodeURIComponent(this.props.deptCode.value)}`;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				this.setState({
					cityCounts: data.results,
					initialLoad: true
				})
			});
		*/
	}
	
	render() {
		return (
			<h1 className={styles.h1}>Heyyy</h1>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		deptCode: state.mainReducer.deptCode
	};
}

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(MandatoryCourses);
