import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Divider from '@material-ui/core/Divider';
import Home from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Satellite from '@material-ui/icons/Satellite';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Sync from '@material-ui/icons/Sync';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	menuButton: {
		color: '#fff',
		border: '2px solid #ffffff55',
		borderRadius: '50%',
		float: 'right',
		margin: '1rem'
	}
});

function MobileDrawer() {
	const classes = useStyles();
	
	const [state, setState] = React.useState({
		openDrawer: false
	});
	
	const toggleDrawer = (open) => event => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, openDrawer: open });
	};
	
	const sideList = (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				<Link exact="true" to="/en/home">
					<ListItem button>
						<ListItemIcon><Home /></ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
				</Link>
				<Link exact="true" to="/en/about">
					<ListItem button>
						<ListItemIcon><Satellite /></ListItemIcon>
						<ListItemText primary="About" />
					</ListItem>
				</Link>
				<Link exact="true" to="/en/calendar">
					<ListItem button>
						<ListItemIcon><CalendarToday /></ListItemIcon>
						<ListItemText primary="Calendar" />
					</ListItem>
				</Link>
			</List>
			<Divider />
			<List>
				<ListItem button>
					<ListItemIcon><Sync /></ListItemIcon>
					<ListItemText primary="Français" />
				</ListItem>
			</List>
		</div>
	);
	
	return (
		<>
			<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
				<MenuIcon />
			</IconButton>
			
			<SwipeableDrawer open={state.openDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
				{sideList}
			</SwipeableDrawer>
		</>
	);
}

export default MobileDrawer;
