import React, { Component } from 'react';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import Select from 'react-select';
import styles from './Home.css';



// Ensure fields that could contain accented characters are forced as HTML encoded, else
// AJAX will fail on IE11

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: '',
			possibleOptions: []
		};
	}
	
	componentDidMount() {
		let url = 'https://registhor.da-an.ca/api/v1/registrations/department_codes?key=' + REGISTHOR_API_KEY;
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
	
	handleChange = (e) => {
		this.setState({ selectedOption: e });
	};
	
	render() {
		return (
			<div className={styles.selectionForm}>
				<h3>Choose any department to see all of its School data.</h3>
				<Select
					autoFocus={false}
					isSearchable={true}
					noOptionsMessage={() => 'No results'}
					onChange={this.handleChange}
					options={this.state.possibleOptions}
					placeholder="Select..."
					value={this.state.selectedOption}
				/>
				<div className={styles.outerButtons}>
					<input type="submit" value="Go" className="btn btn-primary" />
					<input type="submit" value="Make My Day" className="btn btn-primary" />
				</div>
			</div>
		);
	}
}

export default Home;
