import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	FormGroup,
	FormControlLabel,
	Switch
} from '@material-ui/core';

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
			checked: false
		};
	}
	
	toggleSwitch = () => {
		this.setState((state, props) => {
			return { checked: !state.checked }
		});
	}
	
	render() {
		return (
			<FormGroup>
				<FormControlLabel
					control={
						<StyledSwitch
							checked={this.state.checked}
							onChange={this.toggleSwitch}
						/>
					}
					label={`${this.props.course.course_code}: ${this.props.course.course_title}`}
				/>
			</FormGroup>
		);
	}
}

export default CourseSwitch;
