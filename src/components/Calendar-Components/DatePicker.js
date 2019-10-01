import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DatePickerImport.css';
import styles from './DatePicker.css';

class DatePicker extends Component {
	labelKey = this.props.label === 'To:' ? 'datePickerTo' : 'datePickerFrom';
	
	handleDayClick = (day) => {
		this.props.changeInputs({ [this.labelKey]: day });
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		// Must use .getTime method to compare dates in JS
		return (nextProps.currentInputs.datePickerTo.getTime() !== this.props.currentInputs.datePickerTo.getTime()) ||
			   (nextProps.currentInputs.datePickerFrom.getTime() !== this.props.currentInputs.datePickerFrom.getTime());
	}
	
	render() {
		return (
			<div className={styles.outerPicker}>
				<span>{this.props.label}</span>
				<DayPicker
					enableOutsideDaysClick={true}
					fromMonth={new Date(2018, 3, 1)}
					onDayClick={this.handleDayClick}
					selectedDays={this.props.currentInputs[this.labelKey]}
					showOutsideDays={true}
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
