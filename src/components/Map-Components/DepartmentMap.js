import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import Map from './Map';
import styles from './DepartmentMap.css';

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
				<h4 className={styles.h4}>Discover where your learners are attending in-person training this fiscal year.</h4>
				<Map cityCounts={this.state.cityCounts} />
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
