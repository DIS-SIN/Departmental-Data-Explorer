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
			datePickerFrom: new Date(),
			datePickerTo: new Date(),
			modalBusinessLine: '',
			modalClientsOnly: false,
			modalCourseCode: '',
			modalExcludeCancelled: false,
			modalInstructor: ''
		}
	}
	
	changeInputs = (newInputs) => {
		this.setState({ ...newInputs }, () => {
			this.getCountsRegisthor();
		});
	}
	
	getISO = (myDate) => {
		// Registhor accepts dates in standard YYYY-MM-DD ISO format.
		let todayYear = myDate.getFullYear();
		// Months are 0-indexed in JS
		let todayMonth = myDate.getMonth() + 1;
		let todayDay = myDate.getDate();
		return `${todayYear}-${todayMonth}-${todayDay}`;
	}
	
	componentDidMount() {
		this.getCountsRegisthor();
	}
	
	getCountsRegisthor = () => {
		let url = 'https://registhor.da-an.ca/api/v1/offering-counts?key=' + REGISTHOR_API_KEY + '&date_1=' +
				  this.getISO(this.state.datePickerFrom) + '&date_2=' + this.getISO(this.state.datePickerTo) +
				  '&course_code=' + this.state.modalCourseCode + '&instructor_name=' + this.state.modalInstructor +
				  '&exclude_cancelled=' + this.state.modalExcludeCancelled + '&business_line=' + this.state.modalBusinessLine +
				  '&clients_only=' + this.state.modalClientsOnly;
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
					changeInputs={this.changeInputs}
					currentInputs={this.state}
				/>
				<Map cityCounts={this.state.cityCounts} />
			</>
		);
	}
}

export default Calendar;
