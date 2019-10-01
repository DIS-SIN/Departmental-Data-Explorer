import React, { Component } from 'react';
import TableLegend from './TableLegend';
import styles from './Table.css';

class TableRow extends Component {
	render() {
		return (
			<tr style={{ backgroundColor: this.props.row.background_color }}>
				<td data-title="Course Code">{this.props.row.course_code}</td>
				<td data-title="'Course Title">{this.props.row.course_title}</td>
				<td data-title="City">{this.props.row.offering_city}</td>
				<td data-title="Instructor(s)">{this.props.row.instructor_names}</td>
				<td data-title="Business Type">{this.props.row.business_type}</td>
				<td data-title="Confirmed">{this.props.row.confirmed_count}</td>
				<td data-title="More">&nbsp;</td>
			</tr>
		);
	}
}

class Table extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<>
				<TableLegend />
				<table className={'table ' + styles.calendarTable}>
					<thead>
						<tr>
							<th>Course Code</th>
							<th>Course Title</th>
							<th>City</th>
							<th>Instructor(s)</th>
							<th>Business Type</th>
							<th>Confirmed</th>
							<th>More</th>
						</tr>
					</thead>
					<tbody>
						{this.props.offeringsArray.map((row, index) => {
							return <TableRow row={row} key={'calendarRow-' + index} />
						})}
					</tbody>
				</table>
			</>
		);
	}
}

export default Table;
