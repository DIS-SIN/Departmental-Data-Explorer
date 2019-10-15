// Polyfills for IE11; must be imported before React
import '@babel/polyfill';
import 'es6-promise';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import { commentReducer } from './reducers/comment-reducer';
import { mainReducer } from './reducers/main-reducer';

// Data flow in Redux: React component -> action -> reducer -> store

/***** INITIAL STATE *****/
const initialState = {
	commentReducer: {
		comments: {
			improvement: [],
			general: [],
			technical: []
		},
		commentsPending: {
			improvement: false,
			general: false,
			technical: false
		},
		counts: {
			improvement: {},
			general: {},
			technical: {}
		},
		countsPending: {
			improvement: false,
			general: false,
			technical: false
		},
		currentIndices: {
			improvement: 0,
			general: 0,
			technical: 0
		},
		optionalFilters: {
			courseCode: ''
		}
	},
	mainReducer: {
		deptCode: {}
	}
};

/***** REDUCERS *****/
const allReducers = combineReducers({
	commentReducer: commentReducer,
	mainReducer: mainReducer
});

/***** ENHANCERS *****/
const allEnhancers = compose(
	applyMiddleware(thunk),
	// Use short circuiting i.e. if the devtools extension is present, call it
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/***** STORE *****/
const store = createStore(allReducers, initialState, allEnhancers);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

export { initialState };
