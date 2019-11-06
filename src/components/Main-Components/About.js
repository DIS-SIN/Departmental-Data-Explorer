import React from 'react';
import styles from './About.css';

function About() {
	return (
		<div className={styles.about}>
			<h3>This app aims to give you easy, instant access to your department's School data.</h3>
			<p>Features:</p>
			<ul>
				<li>View charts showing learning KPIs</li>
				<li>Read all comments submitted by your learners since the start of electronic surveys in 2015</li>
				<li>View maps of where in Canada your learners are taking School courses</li>
				<li>Download your department's raw data for both registrations and comments</li>
				<li>Find upcoming School offerings via an intereactive calendar</li>
				<li>Indicate which School courses your department considers mandatory</li>
			</ul>
			<p>
				If you encounter any bugs or would like features added, please contact <a href="mailto:sam.louden@canada.ca">Sam Louden</a>.
			</p>
			<h4>
				Data in all tabs are updated daily at 3:00am EST.
			</h4>
		</div>
	);
}

export default About;
