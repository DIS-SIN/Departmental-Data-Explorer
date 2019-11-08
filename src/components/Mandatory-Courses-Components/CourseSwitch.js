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
			checked: this.props.course.mandatory
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
				<span className={"glyphicon glyphicon-plus " + styles.icon}></span>
			</div>
		);
	}
}

export default CourseSwitch;
