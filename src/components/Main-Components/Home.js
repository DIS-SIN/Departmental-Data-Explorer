import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import { Redirect } from 'react-router-dom';
import { updateDeptCode } from '../../actions/main-actions';
import Select from 'react-select';
import styles from './Home.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			possibleOptions: [],
			selectedOption: '',
			redirect: false
		};
	}
	
	componentDidMount() {
		let url = 'https://registhor.da-an.ca/api/v1/registrations/department-codes?key=' + REGISTHOR_API_KEY;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				// Convert array from style [{department_code: '...', department_name: '...'}] to
				// style [{value: '...', label: '...'}] required by react-select
				let possibleOptions = data.results.map(dept => {
					return { value: dept.department_code, label: dept.department_name };
				});
				this.setState({ possibleOptions: possibleOptions });
			});
	}
	
	clearSelection = () => {
		this.setState({ selectedOption: '' });
	};
	
	handleChange = (e) => {
		this.setState({ selectedOption: e });
	};
	
	handleKeyDown = (e) => {
		if (e.key === 'Enter' && this.state.selectedOption !== '') {
			this.onUpdateDeptCode(e);
		}
	};
	
	onUpdateDeptCode = (e) => {
		e.preventDefault();
		if (this.state.selectedOption !== '') {
			this.props.onUpdateDeptCode(this.state.selectedOption);
			this.setState({ redirect: true });
		}
	}
	
	onSelectRandom = (e) => {
		e.preventDefault();
		let { possibleOptions } = this.state;
		
		let randomDepartment = possibleOptions[Math.floor(Math.random() * possibleOptions.length)];
		if(typeof randomDepartment !== 'undefined') {
			this.props.onUpdateDeptCode(randomDepartment);
			this.setState({ redirect: true });
		}
	}
	
	render() {
		if (this.state.redirect) {
			return <Redirect exact to="/en/department-page"/>;
		}
		return (
			<div className={styles.selectionForm}>
				<h3>Choose any department to see all of its School data.</h3>
				<Select
					autoFocus={false}
					className={styles.selectionDropdown}
					isSearchable={true}
					noOptionsMessage={() => 'No results'}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					onMenuOpen={this.clearSelection}
					options={this.state.possibleOptions}
					placeholder="Select..."
					value={this.state.selectedOption}
				/>
				<div className={styles.outerButtons}>
					<button className={'btn btn-primary ' + styles.myBtn} onClick={this.onUpdateDeptCode}>Go</button>
					<button className={'btn btn-primary ' + styles.myBtn} onClick={this.onSelectRandom}>Make My Day</button>
				</div>
			</div>
		);
	}
}

// Add Redux to component
const mapStateToProps = (state) => {
	return {};
}
const mapActionsToProps = {
	onUpdateDeptCode: updateDeptCode
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
