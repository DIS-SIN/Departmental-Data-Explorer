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
	toggleSort = () => {
		this.props.setSort(this.props.name);
	}
	
	render() {
		let myClass = (this.props.sortKey !== this.props.name) ? styles.unsorted : ((this.props.sortAsc === true) ? styles.asc : styles.desc);
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
			currentRow: {},
			sortKey: null,
			sortAsc: null
		};
	}
	
	setModal = (row) => {
		this.setState({
			modalOpen: true,
			currentRow: row
		});
	}
	
	setSort = (newKey) => {
		this.setState((state, props) => {
			let asc;
			if (newKey !== state.sortKey) {
				asc = true;
			} else {
				asc = !state.sortAsc;
			}
			return {
				sortKey: newKey,
				sortAsc: asc
			};
		}, () => {
			this.props.sortOfferingsArray(this.state.sortKey, this.state.sortAsc);
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
							<SortableHeader name="course_code" label="Course Code" sortKey={this.state.sortKey} sortAsc={this.state.sortAsc} setSort={this.setSort} />
							<SortableHeader name="course_title" label="Course Title" sortKey={this.state.sortKey} sortAsc={this.state.sortAsc} setSort={this.setSort} />
							<SortableHeader name="offering_city" label="City" sortKey={this.state.sortKey} sortAsc={this.state.sortAsc} setSort={this.setSort} />
							<SortableHeader name="instructor_names" label="Instructor(s)" sortKey={this.state.sortKey} sortAsc={this.state.sortAsc} setSort={this.setSort} />
							<SortableHeader name="business_type" label="Business Type" sortKey={this.state.sortKey} sortAsc={this.state.sortAsc} setSort={this.setSort} />
							<SortableHeader name="confirmed_count" label="Confirmed" sortKey={this.state.sortKey} sortAsc={this.state.sortAsc} setSort={this.setSort} />
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
