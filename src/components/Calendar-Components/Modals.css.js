// react-modal only allows certain styles to be set via
// an object

const modalStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	content: {
		position: 'absolute',
		top: '20%',
		left: '50%',
		right: 'auto',
		transform: 'translate(-50%, -20%)',
		border: '1px solid #333',
		borderRadius: '4px',
		background: '#fff',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		outline: 'none',
		padding: '20px',
		boxShadow: 'rgba(0, 0, 0, 0.5) 0px 5px 15px 0px'
	}
};

export default modalStyles;
