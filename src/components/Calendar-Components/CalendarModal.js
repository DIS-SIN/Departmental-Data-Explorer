import React, { Component } from 'react';
import Modal from 'react-modal';
import styles from './CalendarModal.css';

function InputBox(props) {
	return (
		<>
			<td><input type="text" name={props.name} value={props.currentCalendarOptions[props.name]} onChange={props.changeInput} /></td>
			<td className={styles.clearInputBox} name={props.name} onClick={props.clearInput}>&times;</td>
		</>
	);
}

class CalendarModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false
		};
	}
	
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
					style={{ overlay: { backgroundColor: '#00000080' } }}
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
											<select name="modalBusinessLine" onChange={this.props.changeInput}>
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
										<InputBox
											name="modalCourseCode"
											changeInput={this.props.changeInput}
											clearInput={this.props.clearInput}
											currentCalendarOptions={this.props.currentCalendarOptions}
										/>
									</tr>
									<tr>
										<td>Instructor</td>
										<InputBox
											name="modalInstructor"
											changeInput={this.props.changeInput}
											clearInput={this.props.clearInput}
											currentCalendarOptions={this.props.currentCalendarOptions}
										/>
									</tr>
									<tr>
										<td>Exclude Cancelled Offerings</td>
										<td>
											<select name="modalExcludeCancelled" onChange={this.props.changeInput}>
												<option value="false">No</option>
												<option value="true">Yes</option>
											</select>
										</td>
										<td></td>
									</tr>
									<tr>
										<td>Show Only Client Requests</td>
										<td>
											<select name="modalClientsOnly" onChange={this.props.changeInput}>
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
