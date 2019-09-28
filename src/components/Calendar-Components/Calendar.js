import React, { Component } from 'react';
import CalendarInputs from './CalendarInputs';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import Map from './Map';
import styles from './Calendar.css';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityCounts: []
		}
	}
	
	// Make formatting date a func
	
	componentDidMount() {
		// Registhor accepts dates in standard YYYY-MM-DD ISO format.
		let today = new Date(Date.now());
		let todayYear = today.getFullYear();
		// Months are 0-indexed in JS
		let todayMonth = today.getMonth() + 1;
		let todayDay = today.getDate();
		let isoDate = `${todayYear}-${todayMonth}-${todayDay}`;
		fetch(`https://registhor.da-an.ca/api/v1/offering-counts?key=${REGISTHOR_API_KEY}&date_1=${isoDate}&exclude_cancelled=false`)
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
				<CalendarInputs />
				<Map cityCounts={this.state.cityCounts} />
			</>
		);
	}
}

export default Calendar;
