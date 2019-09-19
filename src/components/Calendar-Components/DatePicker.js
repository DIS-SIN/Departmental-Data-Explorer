import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DatePickerImport.css';
import styles from './DatePicker.css';

class DatePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDate: new Date()
		};
	}
	
	handleDayClick = (day) => {
		this.setState({ selectedDate: day });
	}
	
	render() {
		return (
			<div className={styles.outerPicker}>
				<span>{this.props.label}</span>
				<DayPicker
					fromMonth={new Date(2018, 3, 1)}
					onDayClick={this.handleDayClick}
					selectedDays={this.state.selectedDate}
					toMonth={new Date(2020, 2, 31)}
				/>
			</div>
		);
	}
}

DatePicker.propTypes = {
	label: PropTypes.string.isRequired
};

export default DatePicker;
