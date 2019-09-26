import React from 'react';
import CalendarInputs from './CalendarInputs';
import styles from './Calendar.css';

function Calendar() {
	return (
		<>
			<h3 className={styles.h3}>Search for offerings by date, instructor, and more.</h3>
			<CalendarInputs />
		</>
	);
}

export default Calendar;
