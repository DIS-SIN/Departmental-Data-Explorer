import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import CourseSwitch from './CourseSwitch';
import styles from './MandatoryCourses.css';

class MandatoryCourses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			coursesSelected: 0,
			courseList: [],
			// Flag if Registhor has been called
			initialLoad: false
		};
	}
	
	componentDidMount() {
		this.getCoursesRegisthor();
	}
	
	// Increment or decrement the global count whenever a user modifies their list
	// of mandatory courses
	incrementCount = (decrement) => {
		let offset = decrement ? -1 : 1; 
		this.setState((state, props) => {
			return { coursesSelected: state.coursesSelected + offset };
		});
	}
	
	// Get list of active courses to display to user
	getCoursesRegisthor = () => {
		// Ensure fields that could contain accented characters are forced as HTML encoded, else
		// AJAX will fail on IE11
		let url = `https://registhor.da-an.ca/api/v1/departments/mandatory-courses?key=${REGISTHOR_API_KEY}&department_code=${encodeURIComponent(this.props.deptCode)}`;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				// Get number of courses marked as mandatory
				let coursesSelected = 0;
				data.results.forEach(function (myObj) {
					if (myObj.mandatory) { coursesSelected++; }
				});
				
				this.setState({
					coursesSelected: coursesSelected,
					courseList: data.results,
					initialLoad: true
				})
			});
	}
	
	render() {
		let courseList = this.state.courseList.map((course, index) => {
			return <CourseSwitch course={course} deptCode={this.props.deptCode} incrementCount={this.incrementCount} key={`courseSwitch-${index}`} />
		});
		
		return (
			<>
				<p>You have {this.state.coursesSelected} mandatory {this.state.coursesSelected === 1 ? 'course' : 'courses'}.</p>
				{courseList}
			</>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		deptCode: state.mainReducer.deptCode.value
	};
}

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(MandatoryCourses);
