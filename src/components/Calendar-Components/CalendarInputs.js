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
					changeInputs={this.props.changeInputs}
					currentInputs={this.props.currentInputs}
				/>
				<CalendarModal
					changeInputs={this.props.changeInputs}
					currentInputs={this.props.currentInputs}
				/>
				<DatePicker
					label="To:"
					changeInputs={this.props.changeInputs}
					currentInputs={this.props.currentInputs}
				/>
			</div>
		);
	}
}

export default CalendarInputs;
