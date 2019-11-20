import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CourseSwitch from './CourseSwitch';
import styles from './MandatoryCourses.css';

const TextBox = withStyles({
	root: {
		marginRight: '1.5rem',
		'& label': {
			color: '#3f2a56'
		},
		'& label.Mui-focused': {
			color: '#3f2a56'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#3f2a56'
		}
	}
})(TextField);

class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: ''
		};
	}
	
	// Store input from search box for use in filtering courseList
	changeSearch = (e) => {
		this.setState({ searchString: e.target.value });
	}
	
	// Pass new input to parent
	changeParentSearch = () => {
		this.props.changeSearch(this.state.searchString);
	}
	
	hitEnter = (e) => {
		if (e.key === 'Enter') {
			this.changeParentSearch();
		}
	}
	
	render() {
		return (
			<div className={styles.outerSearch}>
				<TextBox
					label="Search"
					value={this.state.searchString}
					onChange={this.changeSearch}
					onKeyPress={this.hitEnter}
				/>
				<button className={'btn btn-primary ' + styles.myBtn} onClick={this.changeParentSearch}>Go</button>
			</div>
		);
	}
}

class MandatoryCourses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			coursesSelected: 0,
			courseList: [],
			// Flag if Registhor has been called
			initialLoad: false,
			searchString: ''
		};
	}
	
	componentDidMount() {
		this.getCoursesRegisthor();
	}
	
	// Store input from search box for use in filtering courseList
	changeSearch = (newVal) => {
		this.setState({ searchString: newVal });
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
	
	// Increment or decrement the global count whenever a user modifies their list
	// of mandatory courses
	incrementCount = (decrement) => {
		let offset = decrement ? -1 : 1; 
		this.setState((state, props) => {
			return { coursesSelected: state.coursesSelected + offset };
		});
	}
	
	render() {
		// Only show courses whose course codes or course titles contain searchString
		// 'some string'.includes('') returns true, so no need to handle empty string as special case
		let courseList = this.state.courseList.filter((course) => {
			let label = `${course.course_code} ${course.course_title}`.toLowerCase();
			return label.includes(this.state.searchString.toLowerCase());
		}).map((course, index) => {
			return <CourseSwitch course={course} deptCode={this.props.deptCode} incrementCount={this.incrementCount} key={`courseSwitch-${index}-${course.course_code}`} />;
		});
		
		return (
			<>
				<h4 className={styles.h4}>Let us know which courses you consider mandatory for your learners.</h4>
				<SearchBox changeSearch={this.changeSearch} />
				<p className={styles.courseCount}>You have {this.state.coursesSelected} mandatory {this.state.coursesSelected === 1 ? 'course' : 'courses'}.</p>
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
