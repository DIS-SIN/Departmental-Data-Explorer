import React, { Component } from 'react';
import Modal from 'react-modal';
import styles from './CalendarModal.css';

class CalendarModal extends Component {
	state = {
		modalOpen: false
	};
	
	toggleModal = () => {
		this.setState({ modalOpen: !this.state.modalOpen });
	}
	
	componentDidMount() {
		Modal.setAppElement('body');
	}
	
	render() {
		return (
			<>
				{/* Button to open modal */}
				<button className={'btn btn-primary btn-lg ' + styles.btn} onClick={this.toggleModal}>Optional Filters</button>
				
				<Modal
					isOpen={this.state.modalOpen}
					onRequestClose={this.toggleModal}
					className={styles.modal}
				>
					<div className="modal-header" onClick={this.toggleModal}>
						<button className="close">&times;</button>
						<h4 className="modal-title">Optional Filters</h4>
					</div>
					<div className="modal-body">
						<form className={styles.modalForm}>
							<table className="table">
								<tbody>
									<tr>
										<td>Business Line</td>
										<td>
											<select id="modal-business-line">
												<option value="">All</option>
												<option value="Digital Academy">Digital Academy</option>
												<option value="GC and Public Sector Skills">GC and Public Sector Skills</option>
												<option value="Indigenous Learning">Indigenous Learning</option>
												<option value="Respectful and Inclusive Workplace">Respectful and Inclusive Workplace</option>
												<option value="Transferable Skills">Transferable Skills</option>
											</select>
										</td>
										<td></td>
									</tr>
									<tr>
										<td>Course Code</td>
										<td><input type="text" value="" /></td>
										<td className={styles.clearSiblingInput}>&times;</td>
									</tr>
									<tr>
										<td>Instructor</td>
										<td><input type="text" value="" /></td>
										<td className={styles.clearSiblingInput}>&times;</td>
									</tr>
									<tr>
										<td>Exclude Cancelled Offerings</td>
										<td>
											<select>
												<option value="false">No</option>
												<option value="true">Yes</option>
											</select>
										</td>
										<td></td>
									</tr>
									<tr>
										<td>Show Only Client Requests</td>
										<td>
											<select>
												<option value="false">No</option>
												<option value="true">Yes</option>
											</select>
										</td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</form>
					</div>
					<div className="modal-footer">
						<button className={'btn btn-primary ' + styles.btn} onClick={this.toggleModal}>Close</button>
					</div>
				</Modal>
			</>
		);
	}
}

export default CalendarModal;
