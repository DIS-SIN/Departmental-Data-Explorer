import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DatePicker.css';

class DatePicker extends Component {
	state = {
		selectedDate: new Date()
	};
	
	handleDayClick = (day) => {
		this.setState({ selectedDate: day });
	}
	
	render() {
		return (
			<DayPicker
				fromMonth={new Date(2018, 3, 1)}
				onDayClick={this.handleDayClick}
				selectedDays={this.state.selectedDate}
				toMonth={new Date(2020, 2, 31)}
			/>
		);
	}
}

export default DatePicker;
