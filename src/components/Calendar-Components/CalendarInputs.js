import React, { Component } from 'react';
import CalendarModal from './CalendarModal';
import DatePicker from './DatePicker';
import styles from './CalendarInputs.css';

function CalendarInputs(props) {
	return (
		<div className={styles.calendarInputs}>
			<DatePicker
				label="From:"
				changeInputs={props.changeInputs}
				currentInputs={props.currentInputs}
			/>
			<CalendarModal
				changeInputs={props.changeInputs}
				currentInputs={props.currentInputs}
			/>
			<DatePicker
				label="To:"
				changeInputs={props.changeInputs}
				currentInputs={props.currentInputs}
			/>
		</div>
	);
}

export default CalendarInputs;
