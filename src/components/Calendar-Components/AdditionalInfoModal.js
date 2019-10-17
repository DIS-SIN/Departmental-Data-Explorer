import React, { Component } from 'react';
import ScrollLock from 'react-scrolllock';
import Modal from 'react-modal';
import styles from './Modals.css';

class AdditionalInfoModal extends Component {
	componentDidMount() {
		Modal.setAppElement('body');
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.modalOpen !== this.props.modalOpen;
	}
	
	render() {
		return (
			<Modal
				isOpen={this.props.modalOpen}
				onRequestClose={this.props.closeModal}
				className={styles.content}
				overlayClassName={styles.overlay}
			>
				<div className="modal-header">
					<button className="close" onClick={this.props.closeModal}>&times;</button>
					<h4 className="modal-title">Additional Info</h4>
				</div>
				<div className={"modal-modal " + styles.modalBody}>
					<form className={styles.additionalInfo}>
						<table className="table table-hover">
							<tbody>
								{/* All fields not displayed in table */}
								<tr>
									<td>Offering ID</td>
									<td>{this.props.currentRow.offering_id}</td>
								</tr>
								<tr>
									<td>Start Date</td>
									<td>{this.props.currentRow.start_date}</td>
								</tr>
								<tr>
									<td>End Date</td>
									<td>{this.props.currentRow.end_date}</td>
								</tr>
								<tr>
									<td>Business Line</td>
									<td>{this.props.currentRow.business_line}</td>
								</tr>
								<tr>
									<td>Status</td>
									<td>{this.props.currentRow.offering_status}</td>
								</tr>
								<tr>
									<td>Language</td>
									<td>{this.props.currentRow.offering_language}</td>
								</tr>
								<tr>
									<td>City</td>
									<td>{this.props.currentRow.offering_city}</td>
								</tr>
								<tr>
									<td>Province</td>
									<td>{this.props.currentRow.offering_province}</td>
								</tr>
								<tr>
									<td>Region</td>
									<td>{this.props.currentRow.offering_region}</td>
								</tr>
								<tr>
									<td>Confirmed</td>
									<td>{this.props.currentRow.confirmed_count}</td>
								</tr>
								<tr>
									<td>Cancelled</td>
									<td>{this.props.currentRow.cancelled_count}</td>
								</tr>
								<tr>
									<td>Waitlisted</td>
									<td>{this.props.currentRow.waitlisted_count}</td>
								</tr>
								<tr>
									<td>No-Shows</td>
									<td>{this.props.currentRow.no_show_count}</td>
								</tr>
								<tr>
									<td>Event Description</td>
									<td>{this.props.currentRow.event_description}</td>
								</tr>
								<tr>
									<td>Client Code</td>
									<td>{this.props.currentRow.client_dept_code}</td>
								</tr>
								<tr>
									<td>Client Name</td>
									<td>{this.props.currentRow.client_dept_name}</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
				<div className={"modal-footer " + styles.modalFooter}>
					<button className={'btn btn-primary ' + styles.myBtn} onClick={this.props.closeModal}>Close</button>
				</div>
				
				<ScrollLock isActive={this.props.modalOpen} />
			</Modal>
		);
	}
}

export default AdditionalInfoModal;
