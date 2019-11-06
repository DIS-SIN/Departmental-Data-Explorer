import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import CourseSwitch from './CourseSwitch';
import styles from './MandatoryCourses.css';

class MandatoryCourses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			courseList: [],
			// Flag if Registhor has been called
			initialLoad: false
		};
	}
	
	componentDidMount() {
		this.getCoursesRegisthor();
	}
	
	// Get list of active courses to display to user
	getCoursesRegisthor = () => {
		// Ensure fields that could contain accented characters are forced as HTML encoded, else
		// AJAX will fail on IE11
		let url = `https://registhor.da-an.ca/api/v1/registrations/course-codes?key=${REGISTHOR_API_KEY}&department_code=${encodeURIComponent(this.props.deptCode.value)}`;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				this.setState({
					courseList: data.results,
					initialLoad: true
				})
			});
	}
	
	render() {
		let courseList = this.state.courseList.map((course, index) => {
			return <CourseSwitch course={course} key={`courseSwitch-${index}`} />
		});
		
		return (
			<>
				{courseList}
			</>
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
