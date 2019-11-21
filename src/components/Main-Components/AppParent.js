import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import {
	AppBar,
	Box,
	Container,
	Tab,
	Tabs,
	Typography,
	makeStyles,
	useMediaQuery,
	useTheme
} from '@material-ui/core';
import DepartmentMap from '../Map-Components/DepartmentMap';
import Footer from '../Nav-Components/Footer';
import Header from '../Nav-Components/Header';
import MandatoryCourses from '../Mandatory-Courses-Components/MandatoryCourses';
import Nav from '../Nav-Components/Nav';
import styles from './AppParent.css';

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			<Box style={{ padding: 0, margin: '1.5rem 0' }} p={3}>{children}</Box>
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		margin: 0,
		padding: 0
	},
	appBar: {
		backgroundColor: '#f5f5f5',
		color: '#3f2a56'
	},
	tabPanel: {
		minHeight: '90vh'
	}
}));

function AppNav(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);
	// If small screen, stack tabs vertically
	const smallScreen = useMediaQuery('(max-width: 767px)');
	
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	
	const handleChangeIndex = index => {
		setValue(index);
	};
	
	// Explanations of comment tabs
	/*
	const generalBlurb     = 'Answers to the question: Please explain your overall satisfaction or dissatisfaction with this learning activity.';
	const improvementBlurb = 'Answers to the question: Do you have any other comments you would like to share to help the School improve?';
	const technicalBlurb   = 'Answers to the question: Do you have any comments you would like to share about your technical experience of this learning activity?';
	*/
	
	return (
		<div className={classes.root}>
			<h3 className={styles.h3}>{props.department_name}</h3>
			<AppBar className={classes.appBar} position="static">
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					className={classes.appBar}
					TabIndicatorProps={{ style: { backgroundColor: '#3f2a56' } }}
					orientation={smallScreen ? "vertical" : undefined}
				>
					<Tab label="Map" />
					<Tab label="Mandatory Courses" />
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel className={classes.tabPanel} value={value} index={0} dir={theme.direction}>
					<DepartmentMap />
				</TabPanel>
				<TabPanel className={classes.tabPanel} value={value} index={1} dir={theme.direction}>
					<MandatoryCourses />
				</TabPanel>
			</SwipeableViews>
		</div>
	);
}

function AppParent(props) {
	// If user hasn't made a selection, redirect to home page
	if (props.department_name === undefined) {
		return <Redirect exact to="/en/home"/>;
	}
	
	return (
		<AppNav department_name={props.department_name} />
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		department_name: state.mainReducer.deptCode.label
	};
}

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(AppParent);
