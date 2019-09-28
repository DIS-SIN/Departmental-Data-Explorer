import React, { Component } from 'react';
import CalendarInputs from './CalendarInputs';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import Map from './Map';
import styles from './Calendar.css';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityCounts: [],
			datePickerFrom: this.getTodayISO(),
			datePickerTo: this.getTodayISO(),
			modalBusinessLine: '',
			modalClientsOnly: false,
			modalCourseCode: '',
			modalExcludeCancelled: false,
			modalInstructor: ''
		}
	}
	
	changeInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}
	
	clearInput = (e) => {
		this.setState({ [e.target.attributes.name.value]: '' });
	}
	
	getTodayISO = () => {
		// Registhor accepts dates in standard YYYY-MM-DD ISO format.
		let today = new Date(Date.now());
		let todayYear = today.getFullYear();
		// Months are 0-indexed in JS
		let todayMonth = today.getMonth() + 1;
		let todayDay = today.getDate();
		return `${todayYear}-${todayMonth}-${todayDay}`;
	}
	
	componentDidMount() {
		this.getCountsRegisthor();
	}
	
	getCountsRegisthor = () => {
		let url = 'https://registhor.da-an.ca/api/v1/offering-counts?key=' + REGISTHOR_API_KEY + '&date_1=' +
				  this.datePickerFrom + '&date_2=' + this.datePickerTo + '&course_code=' + this.modalCourseCode +
				  '&instructor_name=' + this.modalInstructor + '&exclude_cancelled=' + this.modalExcludeCancelled +
				  '&business_line=' + this.modalBusinessLine + '&clients_only=' + this.modalClientsOnly;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				this.setState({
					cityCounts: data.results
				})
			});
	}
	
	render() {
		return (
			<>
				<h3 className={styles.h3}>Search for offerings by date, instructor, and more.</h3>
				<CalendarInputs
					changeInput={this.changeInput}
					clearInput={this.clearInput}
					currentCalendarOptions={this.state}
				/>
				<Map cityCounts={this.state.cityCounts} />
			</>
		);
	}
}

export default Calendar;
