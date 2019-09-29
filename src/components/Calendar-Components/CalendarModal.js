import React, { Component } from 'react';
import Modal from 'react-modal';
import styles from './CalendarModal.css';

function InputBox(props) {
	return (
		<>
			<td><input type="text" name={props.name} value={props.currentInputs[props.name]} onChange={props.changeInput} /></td>
			<td className={styles.clearInputBox} name={props.name} onClick={props.clearInput}>&times;</td>
		</>
	);
}

class CalendarModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			modalBusinessLine: '',
			modalClientsOnly: false,
			modalCourseCode: '',
			modalExcludeCancelled: false,
			modalInstructor: ''
		};
	}
	
	toggleModal = () => {
		this.setState({ modalOpen: !this.state.modalOpen }, () => {
			// If closing (but not opening) modal, pass state to parent
			// This will trigger call to Registhor
			if (!this.state.modalOpen) {
				this.props.changeInputs(this.state);
			}
		});
	}
	
	componentDidMount() {
		Modal.setAppElement('body');
	}
	
	changeInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}
	
	clearInput = (e) => {
		e.persist();
		this.setState({ [e.target.attributes.name.value]: '' });
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
					style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
				>
					<div className="modal-header">
						<button className="close" onClick={this.toggleModal}>&times;</button>
						<h4 className="modal-title">Optional Filters</h4>
					</div>
					<div className="modal-body">
						<form className={styles.modalForm}>
							<table className="table">
								<tbody>
									<tr>
										<td>Business Line</td>
										<td>
											<select name="modalBusinessLine" onChange={this.changeInput} value={this.state.modalBusinessLine}>
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
											changeInput={this.changeInput}
											clearInput={this.clearInput}
											currentInputs={this.state}
										/>
									</tr>
									<tr>
										<td>Instructor</td>
										<InputBox
											name="modalInstructor"
											changeInput={this.changeInput}
											clearInput={this.clearInput}
											currentInputs={this.state}
										/>
									</tr>
									<tr>
										<td>Exclude Cancelled Offerings</td>
										<td>
											<select name="modalExcludeCancelled" onChange={this.changeInput} value={this.state.modalExcludeCancelled}>
												<option value="false">No</option>
												<option value="true">Yes</option>
											</select>
										</td>
										<td></td>
									</tr>
									<tr>
										<td>Show Only Client Requests</td>
										<td>
											<select name="modalClientsOnly" onChange={this.changeInput} value={this.state.modalClientsOnly}>
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
