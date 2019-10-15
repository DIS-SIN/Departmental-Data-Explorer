import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Comments from './Comments';
import Container from '@material-ui/core/Container';
import Header from '../Nav-Components/Header';
import Nav from '../Nav-Components/Nav';
import Footer from '../Nav-Components/Footer';

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
			<Box p={3}>{children}</Box>
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: 'transparent',
		width: '100%',
		margin: 0,
		padding: 0
	}
}));

function CommentsNav() {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);
	
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	
	const handleChangeIndex = index => {
		setValue(index);
	};
	
	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
				>
					<Tab label="Improvement" />
					<Tab label="Overall" />
					<Tab label="Technical" />
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<Comments commentType="improvement" />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<Comments commentType="general" />
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<Comments commentType="technical" />
				</TabPanel>
			</SwipeableViews>
		</div>
	);
}

function CommentsParent() {
	return (
		<>
			<Header />
			<Nav />
			<Container>
				<CommentsNav />
			</Container>
			<Footer />
		</>
	);
}

export default CommentsParent;
