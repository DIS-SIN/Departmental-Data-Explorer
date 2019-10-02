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

class SortableHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sortAsc: null
		}
	}
	
	toggleSort = () => {
		this.setState((state, props) => {
			return { sortAsc: !state.sortAsc };
		}, () => {
			this.props.sortOfferingsArray(this.props.name, this.state.sortAsc);
		});
	}
	
	render() {
		let myClass = (this.state.sortAsc === null) ? styles.unsorted : ((this.state.sortAsc === true) ? styles.asc : styles.desc);
		return (
			<th className={myClass} onClick={this.toggleSort}>{this.props.label}</th>
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
	
	render() {
		return (
			<>
				<TableLegend count={this.props.offeringsArray.length} />
				<table className={'table ' + styles.calendarTable}>
					<thead>
						<tr>
							<SortableHeader name="course_code" label="Course Code" sortOfferingsArray={this.props.sortOfferingsArray} />
							<SortableHeader name="course_title" label="Course Title" sortOfferingsArray={this.props.sortOfferingsArray} />
							<SortableHeader name="offering_city" label="City" sortOfferingsArray={this.props.sortOfferingsArray} />
							<SortableHeader name="instructor_names" label="Instructor(s)" sortOfferingsArray={this.props.sortOfferingsArray} />
							<SortableHeader name="business_type" label="Business Type" sortOfferingsArray={this.props.sortOfferingsArray} />
							<SortableHeader name="confirmed_count" label="Confirmed" sortOfferingsArray={this.props.sortOfferingsArray} />
							<th className={styles.noPointer}>More</th>
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
