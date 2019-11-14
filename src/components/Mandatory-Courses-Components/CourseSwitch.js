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
		
		return (
			<div className={styles.outerDiv}>
				<div>
					<StyledSwitch
						checked={this.state.checked}
						onChange={this.toggleSwitch}
					/>
					<p>{label}</p>
				</div>
				<span style={{ display: this.state.infoOpen ? 'inline-block' : 'none' }} onClick={this.fetchCourseInfo} className={"glyphicon glyphicon-minus " + styles.icon}></span>
				<span style={{ display: this.state.infoOpen ? 'none' : 'inline-block' }} onClick={this.fetchCourseInfo} className={"glyphicon glyphicon-plus " + styles.icon}></span>
			</div>
		);
	}
}

export default CourseSwitch;
