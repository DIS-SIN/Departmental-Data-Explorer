import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	FormGroup,
	FormControlLabel,
	Switch
} from '@material-ui/core';

const StyledSwitch = withStyles({
	switchBase: {
		color: 'green',
		'&$checked': {
			color: 'blue'
		},
		'&$checked + $track': {
			backgroundColor: 'blue'
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
