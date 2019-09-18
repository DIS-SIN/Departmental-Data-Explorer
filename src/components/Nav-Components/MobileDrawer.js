import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Home from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Satellite from '@material-ui/icons/Satellite';
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
		top: false,
		left: false,
		bottom: false,
		right: false
	});
	
	const iconMap = {
		'Home': <Home />,
		'About': <Satellite />,
		'Calendar': <CalendarToday />
	};
	
	const toggleDrawer = (side, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, [side]: open });
	};
	
	const sideList = side => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}
		>
			<List>
				{['Home', 'About', 'Calendar'].map((text, index) => (
					<ListItem button key={"mobileNav-" + text}>
						<ListItemIcon>{iconMap[text]}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				<ListItem button key="mobileNav-FR">
					<ListItemIcon><Sync /></ListItemIcon>
					<ListItemText primary="Français" />
				</ListItem>
			</List>
		</div>
	);
	
	return (
		<>
			<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
				<MenuIcon />
			</IconButton>
			
			<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
				{sideList('left')}
			</Drawer>
		</>
	);
}

export default MobileDrawer;
