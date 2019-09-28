import React, { Component } from 'react';
import CalendarModal from './CalendarModal';
import DatePicker from './DatePicker';
import styles from './CalendarInputs.css';

class CalendarInputs extends Component {
	render() {
		return (
			<div className={styles.calendarInputs}>
				<DatePicker label="From:" />
				<CalendarModal
					changeInput={this.props.changeInput}
					clearInput={this.props.clearInput}
					currentCalendarOptions={this.props.currentCalendarOptions}
				/>
				<DatePicker
					label="To:"
				/>
			</div>
		);
	}
}

export default CalendarInputs;
