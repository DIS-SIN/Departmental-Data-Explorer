import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import Map from './Map';
import styles from './DepartmentMap.css';

function Methodology() {
	return (
		<>
			<h3 className={styles.h3}>Methodology</h3>
			<p>Plots employees’ in-person participation in instructor-led courses and events on an interactive map. The geographic locations reflect where learners participated in learning activities, not their places of work. Note that virtual participation in instructor-led courses and events, as well as participation in online courses, is not included as these learning products do not have a fixed location.</p>
		</>
	);
}

class DepartmentMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cityCounts: [],
			// Flag if Registhor has been called
			initialLoad: false
		};
	}
	
	componentDidMount() {
		this.getCountsRegisthor();
	}
	
	getCountsRegisthor = () => {
		// Ensure fields that could contain accented characters are forced as HTML encoded, else
		// AJAX will fail on IE11
		let url = `https://registhor.da-an.ca/api/v1/registrations/training-locations?key=${REGISTHOR_API_KEY}&department_code=${encodeURIComponent(this.props.deptCode.value)}`;
		fetch(url)
			.then(resp => resp.json())
			.then((data) => {
				this.setState({
					cityCounts: data.results,
					initialLoad: true
				})
			});
	}
	
	render() {
		if (this.state.initialLoad && !this.state.cityCounts.length) {
			return <p>Apologies, no learners from this department have or are scheduled to attend in-person learning this fiscal year.</p>
		}
		
		return (
			<>
				<Map cityCounts={this.state.cityCounts} />
				<Methodology />
			</>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		deptCode: state.mainReducer.deptCode
	};
}

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(DepartmentMap);
