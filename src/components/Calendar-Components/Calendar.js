import React, { Component } from 'react';
import CalendarInputs from './CalendarInputs';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import Map from '../Map-Components/Map';
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
		};
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
		let { datePickerFrom, datePickerTo, modalCourseCode, modalInstructor, modalExcludeCancelled, modalBusinessLine, modalClientsOnly } = this.state.inputValues;
		
		// Ensure fields that could contain accented characters are forced as HTML encoded, else
		// AJAX will fail on IE11
		let url = 'https://registhor.da-an.ca/api/v1/offerings/counts-by-city?key=' + REGISTHOR_API_KEY + '&date_1=' +
				  this.getISO(datePickerFrom) + '&date_2=' + this.getISO(datePickerTo) +
				  '&course_code=' + modalCourseCode + '&instructor_name=' + encodeURIComponent(modalInstructor) +
				  '&exclude_cancelled=' + modalExcludeCancelled + '&business_line=' + encodeURIComponent(modalBusinessLine) +
				  '&clients_only=' + modalClientsOnly;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				this.setState({
					cityCounts: data.results
				})
			});
	}
	
	getOfferingsRegisthor = () => {
		let { datePickerFrom, datePickerTo, modalCourseCode, modalInstructor, modalExcludeCancelled, modalBusinessLine, modalClientsOnly } = this.state.inputValues;
		
		// Ensure fields that could contain accented characters are forced as HTML encoded, else
		// AJAX will fail on IE11
		let url = 'https://registhor.da-an.ca/api/v1/offerings/offering-information?key=' + REGISTHOR_API_KEY + '&date_1=' +
				  this.getISO(datePickerFrom) + '&date_2=' + this.getISO(datePickerTo) +
				  '&course_code=' + modalCourseCode + '&instructor_name=' + encodeURIComponent(modalInstructor) +
				  '&exclude_cancelled=' + modalExcludeCancelled + '&business_line=' + encodeURIComponent(modalBusinessLine) +
				  '&clients_only=' + modalClientsOnly;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				this.setState({
					offeringsArray: data.results
				})
			});
	}
	
	sortOfferingsArray = (key, asc) => {
		// Custom sorting function; handles FR
		let compare = (a, b) => {
			let val1 = String(a[key]);
			let val2 = String(b[key]);
			if (asc) {
				return val1.localeCompare(val2, 'fr', {sensitivity: 'base', ignorePunctuation: true, numeric: true})
			} else {
				return -1 * val1.localeCompare(val2, 'fr', {sensitivity: 'base', ignorePunctuation: true, numeric: true})
			}
		}
		this.setState((state, props) => {
			// Clone the array so that when sorted, the === operator recognizes
			// it as a new array
			return { offeringsArray: [...state.offeringsArray].sort(compare) };
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
				<Table offeringsArray={this.state.offeringsArray} sortOfferingsArray={this.sortOfferingsArray} />
				<div style={{ paddingTop: '1px' }}></div>
			</>
		);
	}
}

export default Calendar;
