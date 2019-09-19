import React, { Component } from 'react';
import DatePicker from './DatePicker';
import styles from './CalendarInputs.css';

class CalendarInputs extends Component {
	render() {
		return (
			<div className={styles.calendarInputs}>
				<DatePicker label="From:"/>
				<button className={styles.btn}>Optional Filters</button>
				<DatePicker label="To:"/>
			</div>
		);
	}
}

export default CalendarInputs;
