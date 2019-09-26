import React, { Component } from 'react';
import CalendarModal from './CalendarModal';
import DatePicker from './DatePicker';
import styles from './CalendarInputs.css';

class CalendarInputs extends Component {
	state = {
		modalBusinessLine: '',
		modalClientsOnly: false,
		modalCourseCode: '',
		modalExcludeCancelled: false,
		modalInstructor: ''
	};
	
	changeInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}
	
	clearInput = (e) => {
		this.setState({ [e.target.attributes.name.value]: '' });
	}
	
	render() {
		return (
			<div className={styles.calendarInputs}>
				<DatePicker label="From:" />
				<CalendarModal changeInput={this.changeInput} clearInput={this.clearInput} currentCalendarOptions={this.state} />
				<DatePicker label="To:" />
			</div>
		);
	}
}

export default CalendarInputs;
