import React from 'react';
import { Link } from 'react-router-dom';
import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
	makeStyles
} from '@material-ui/core';
import {
	Beenhere,
	CalendarToday,
	Home,
	Menu,
	Satellite,
	Sync
} from '@material-ui/icons';

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
				<Link exact="true" to="/en/methodology">
					<ListItem button>
						<ListItemIcon><Beenhere /></ListItemIcon>
						<ListItemText primary="Methodology" />
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
				<Menu />
			</IconButton>
			
			<SwipeableDrawer open={state.openDrawer} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
				{sideList}
			</SwipeableDrawer>
		</>
	);
}

export default MobileDrawer;
