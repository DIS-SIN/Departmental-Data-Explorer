import React, { PureComponent } from 'react';
import { REGISTHOR_API_KEY } from '../../utils/API_KEYS';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Switch } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import styles from './CourseSwitch.css';

const StyledSwitch = withStyles({
	switchBase: {
		color: '#f5f5f5',
		'&$checked': {
			color: '#02aaa4'
		},
		'&$checked + $track': {
			backgroundColor: '#02aaa4'
		}
	},
	checked: {},
	track: {}
})(Switch);

function CourseInfo(props) {
	if (!props.infoOpen) { return null; }
	
	// Markup coming directly from DB and not from users, so will allow to be set dangerously
	const createMarkup = () => {
		return { __html: props.courseInfo.course_description_en };
	}
	
	return (
		<div className={styles.infoPanel}>
			<div dangerouslySetInnerHTML={createMarkup()}></div>
			<table className={styles.infoTable}>
				<tbody>
					<tr>
						<td>Delivery Type:</td><td>{props.courseInfo.business_type_en}</td>
					</tr>
					<tr>
						<td>Duration (hours):</td><td>{props.courseInfo.duration}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

class CourseSwitch extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			checked: this.props.course.mandatory,
			courseInfo: {},
			infoOpen: false
		};
	}
	
	toggleSwitch = () => {
		// If switch is checked, AJAX will be for a DELETE request; otherwise a POST request
		let method = this.state.checked ? 'delete' : 'post';
		
		let url = `https://registhor.da-an.ca/api/v1/departments/mandatory-courses?key=${REGISTHOR_API_KEY}`;
		fetch(url, {
			method: method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({department_code: this.props.deptCode, course_code: this.props.course.course_code})
		})
			.then(resp => resp.json())
			// Only flip switch's status if Registhor returns { "status": "OK" }
			.then((data) => {
				if (data.status === 'OK') {
					this.setState((state, props) => {
						return { checked: !state.checked }
					}, () => {
						// Re-fetch course list so parent is aware of changes
						this.props.getCoursesRegisthor();
					});
				}
			});
	}
	
	fetchCourseInfo = () => {
		// Only call API if courseInfo has yet to be populated
		if (Object.keys(this.state.courseInfo).length === 0) {
			let url = `https://registhor.da-an.ca/api/v1/tombstone/${this.props.course.course_code}?key=${REGISTHOR_API_KEY}`;
			fetch(url)
				.then(resp => resp.json())
				.then((data) => {
					this.setState((state, props) => {
						return {
							courseInfo: data.results,
							infoOpen: !state.infoOpen
						};
					});
				});
		} else {
			// Toggle extra info window
			this.setState((state, props) => {
				return { infoOpen: !state.infoOpen };
			});
		}
	}
	
	render() {
		let label = `${this.props.course.course_code}: ${this.props.course.course_title}`;
		let icon = this.state.infoOpen ? <Remove className={styles.iconButton} /> : <Add className={styles.iconButton} />;
		
		return (
			<>
				<div className={styles.roundedBorder}>
					<table className={styles.switchTable}>
						<tbody>
							<tr>
								<td>
									<StyledSwitch
										checked={this.state.checked}
										onChange={this.toggleSwitch}
									/>
								</td>
								<td>{label}</td>
								<td>
									<IconButton onClick={this.fetchCourseInfo}>
										{icon}
									</IconButton>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CourseInfo courseInfo={this.state.courseInfo} infoOpen={this.state.infoOpen} />
			</>
		);
	}
}

export default CourseSwitch;
