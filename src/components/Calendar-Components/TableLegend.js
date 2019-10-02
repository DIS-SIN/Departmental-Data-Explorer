import React, { Component } from 'react';
import styles from './TableLegend.css';

function ResultsCount(props) {
	let noun;
	if (props.count === 1) {
		noun = 'Offering';
	} else {
		noun = 'Offerings';
	}
	return (
		<h3>{`Results: ${props.count} ${noun}`}</h3>
	);
}

class TableLegend extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.count !== this.props.count;
	}
	
	render() {
		return (
			<table className={styles.legend}>
				<thead>
					<tr>
						<td colSpan="2">
							<ResultsCount count={this.props.count}/>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="col-xs-1"><div className={`${styles.colorSwatch} ${styles.swatchDanger}`}></div></td>
						<td className="col-xs-11">Offerings that have been cancelled</td>
					</tr>
					<tr>
						<td className="col-xs-1"><div className={`${styles.colorSwatch} ${styles.swatchWarning}`}></div></td>
						<td className="col-xs-11">Offerings taking place in the next 30 days with fewer than 10 confirmed registrations</td>
					</tr>
					<tr>
						<td className="col-xs-1"><div className={`${styles.colorSwatch} ${styles.swatchSuccess}`}></div></td>
						<td className="col-xs-11">Offerings with more than 10 confirmed registrations and / or that are more than 30 days away</td>
					</tr>
					<tr>
						<td className="col-xs-1"><div className={`${styles.colorSwatch} ${styles.swatchPast}`}></div></td>
						<td className="col-xs-11">Offerings that have already taken place</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default TableLegend;
