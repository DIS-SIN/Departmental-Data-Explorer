import React, { Component } from 'react';
import CalendarInputs from './CalendarInputs';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import Map from './Map';
import Table from './Table';
import styles from './Calendar.css';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityCounts: [],
			inputValues: {
				datePickerFrom: new Date(),
				datePickerTo: new Date(),
				modalBusinessLine: '',
				modalClientsOnly: false,
				modalCourseCode: '',
				modalExcludeCancelled: false,
				modalInstructor: ''
			},
			offeringsArray: []
		}
	}
	
	changeInputs = (newInputs) => {
		this.setState((state, props) => {
			return { inputValues: {...state.inputValues, ...newInputs} };
		}, () => {
			this.runRegisthorQueries();
		});
	}
	
	getISO = (myDate) => {
		// Registhor accepts dates in standard YYYY-MM-DD ISO format.
		let year = myDate.getFullYear();
		// Months are 0-indexed in JS
		let month = myDate.getMonth() + 1;
		let day = myDate.getDate();
		return `${year}-${month}-${day}`;
	}
	
	componentDidMount() {
		this.runRegisthorQueries();
	}
	
	runRegisthorQueries = () => {
		this.getCountsRegisthor();
		this.getOfferingsRegisthor();
	}
	
	getCountsRegisthor = () => {
		let url = 'https://registhor.da-an.ca/api/v1/offering-counts?key=' + REGISTHOR_API_KEY + '&date_1=' +
				  this.getISO(this.state.inputValues.datePickerFrom) + '&date_2=' + this.getISO(this.state.inputValues.datePickerTo) +
				  '&course_code=' + this.state.inputValues.modalCourseCode + '&instructor_name=' + this.state.inputValues.modalInstructor +
				  '&exclude_cancelled=' + this.state.inputValues.modalExcludeCancelled + '&business_line=' + this.state.inputValues.modalBusinessLine +
				  '&clients_only=' + this.state.inputValues.modalClientsOnly;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				this.setState({
					cityCounts: data.results
				})
			});
	}
	
	getOfferingsRegisthor = () => {
		let url = 'https://registhor.da-an.ca/api/v1/offerings?key=' + REGISTHOR_API_KEY + '&date_1=' +
				  this.getISO(this.state.inputValues.datePickerFrom) + '&date_2=' + this.getISO(this.state.inputValues.datePickerTo) +
				  '&course_code=' + this.state.inputValues.modalCourseCode + '&instructor_name=' + this.state.inputValues.modalInstructor +
				  '&exclude_cancelled=' + this.state.inputValues.modalExcludeCancelled + '&business_line=' + this.state.inputValues.modalBusinessLine +
				  '&clients_only=' + this.state.inputValues.modalClientsOnly;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				this.setState({
					offeringsArray: data.results
				})
			});
	}
	
	render() {
		return (
			<>
				<h3 className={styles.h3}>Search for offerings by date, instructor, and more.</h3>
				<CalendarInputs
					changeInputs={this.changeInputs}
					currentInputs={this.state.inputValues}
				/>
				<Map cityCounts={this.state.cityCounts} />
				<Table offeringsArray={this.state.offeringsArray} />
				<div style={{ paddingTop: '1px' }}></div>
			</>
		);
	}
}

export default Calendar;
