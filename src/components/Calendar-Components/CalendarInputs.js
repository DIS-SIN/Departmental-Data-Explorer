import React, { Component } from 'react';
import CalendarModal from './CalendarModal';
import DatePicker from './DatePicker';
import styles from './CalendarInputs.css';

class CalendarInputs extends Component {
	render() {
		return (
			<div className={styles.calendarInputs}>
				<DatePicker label="From:"/>
				<CalendarModal />
				<DatePicker label="To:"/>
			</div>
		);
	}
}

export default CalendarInputs;
