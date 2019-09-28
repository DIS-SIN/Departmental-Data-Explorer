import React, { Component } from 'react';
import CalendarModal from './CalendarModal';
import DatePicker from './DatePicker';
import styles from './CalendarInputs.css';

class CalendarInputs extends Component {
	render() {
		return (
			<div className={styles.calendarInputs}>
				<DatePicker
					label="From:"
					changeInput={this.props.changeInput}
					currentCalendarOptions={this.props.currentCalendarOptions}
				/>
				<CalendarModal
					changeInput={this.props.changeInput}
					clearInput={this.props.clearInput}
					currentCalendarOptions={this.props.currentCalendarOptions}
				/>
				<DatePicker
					label="To:"
					changeInput={this.props.changeInput}
					currentCalendarOptions={this.props.currentCalendarOptions}
				/>
			</div>
		);
	}
}

export default CalendarInputs;
