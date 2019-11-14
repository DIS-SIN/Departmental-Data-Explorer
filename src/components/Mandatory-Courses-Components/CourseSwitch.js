import React, { Component } from 'react';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import styles from './CourseSwitch.css';

const StyledSwitch = withStyles({
	switchBase: {
		color: '#f5f5f5',
		'&$checked': {
			color: '#02aaa4'
		},
		'&$checked + $track': {
			backgroundColor: '#02aaa4'
		}
	},
	checked: {},
	track: {}
})(Switch);

function CourseInfo(props) {
	if (!props.infoOpen) { return null; }
	
	return (
		<p className={styles.infoPanel}>{props.courseInfo.course_description_en}</p>
	);
}

class CourseSwitch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: this.props.course.mandatory,
			courseInfo: {},
			infoOpen: false
		};
	}
	
	toggleSwitch = () => {
		// If switch is checked, AJAX will be for a DELETE request; otherwise a POST request
		let method = this.state.checked ? 'delete' : 'post';
		
		let url = `https://registhor.da-an.ca/api/v1/departments/mandatory-courses?key=${REGISTHOR_API_KEY}`;
		fetch(url, {
			method: method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({department_code: this.props.deptCode, course_code: this.props.course.course_code})
		})
			.then(resp => resp.json())
			// Only flip switch's status if Registhor returns { "status": "OK" }
			.then((data) => {
				if (data.status === 'OK') {
					this.setState((state, props) => {
						return { checked: !state.checked }
					}, () => {
						// Update global count of mandatory courses
						this.props.incrementCount(this.state.checked ? false : true);
					});
				}
			});
	}
	
	fetchCourseInfo = () => {
		// Only call API if courseInfo has yet to be populated
		if (Object.keys(this.state.courseInfo).length === 0) {
			let url = `https://registhor.da-an.ca/api/v1/tombstone/${this.props.course.course_code}?key=${REGISTHOR_API_KEY}`;
			fetch(url)
				.then(resp => resp.json())
				.then((data) => {
					this.setState((state, props) => {
						return {
							courseInfo: data.results,
							infoOpen: !state.infoOpen
						};
					});
				});
		} else {
			// Toggle extra info window
			this.setState((state, props) => {
				return { infoOpen: !state.infoOpen };
			});
		}
	}
	
	render() {
		let label = `${this.props.course.course_code}: ${this.props.course.course_title}`;
		let iconClass = this.state.infoOpen ? 'glyphicon glyphicon-minus ' : 'glyphicon glyphicon-plus ';
		
		return (
			<>
				<div className={styles.outerDiv}>
					<div>
						<StyledSwitch
							checked={this.state.checked}
							onChange={this.toggleSwitch}
						/>
						<p>{label}</p>
					</div>
					<span onClick={this.fetchCourseInfo} className={iconClass + styles.icon}></span>
				</div>
				<CourseInfo courseInfo={this.state.courseInfo} infoOpen={this.state.infoOpen} />
			</>
		);
	}
}

export default CourseSwitch;
