import React, { Component } from 'react';
import AdditionalInfoModal from './AdditionalInfoModal';
import TableLegend from './TableLegend';
import styles from './Table.css';

class TableRow extends Component {
	openModal = () => {
		this.props.setModal(this.props.row);
	}
	
	render() {
		return (
			<tr style={{ backgroundColor: this.props.row.background_color }}>
				<td data-title="Course Code">{this.props.row.course_code}</td>
				<td data-title="Course Title">{this.props.row.course_title}</td>
				<td data-title="City">{this.props.row.offering_city}</td>
				<td data-title="Instructor(s)">{this.props.row.instructor_names}</td>
				<td data-title="Business Type">{this.props.row.business_type}</td>
				<td data-title="Confirmed">{this.props.row.confirmed_count}</td>
				<td data-title="More" onClick={this.openModal}>&nbsp;</td>
			</tr>
		);
	}
}

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			currentRow: {}
		};
	}
	
	setModal = (row) => {
		this.setState({
			modalOpen: true,
			currentRow: row
		});
	}
	
	closeModal = () => {
		this.setState({ modalOpen: false });
	}
	
	sortTableBy = (e) => {
		this.props.sortOfferingsArray(e.target.attributes.name.value, true);
	}
	
	render() {
		return (
			<>
				<TableLegend count={this.props.offeringsArray.length} />
				<table className={'table ' + styles.calendarTable}>
					<thead>
						<tr>
							<th name="course_code" onClick={this.sortTableBy}>Course Code</th>
							<th name="course_title" onClick={this.sortTableBy}>Course Title</th>
							<th>City</th>
							<th>Instructor(s)</th>
							<th>Business Type</th>
							<th>Confirmed</th>
							<th>More</th>
						</tr>
					</thead>
					<tbody>
						{this.props.offeringsArray.map((row, index) => {
							return <TableRow row={row} key={'calendarRow-' + index} setModal={this.setModal} />
						})}
					</tbody>
				</table>
				<AdditionalInfoModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} currentRow={this.state.currentRow} />
			</>
		);
	}
}

export default Table;
