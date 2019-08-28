import '@babel/polyfill'; // Must be imported before React
import 'es6-promise';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import { mainReducer } from './reducers/main-reducer';

// Flow: React component -> action -> reducer -> store

/* ### INITIAL STATE ### */
const initialState = {
	mainReducer: {}
};

/* ### REDUCERS ### */
const allReducers = combineReducers({
	mainReducer: mainReducer
});

/* ### ENHANCERS ###*/
const allEnhancers = compose(
	applyMiddleware(thunk)
	// Use short circuiting i.e. if the devtools extension is present, call it
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

/* ### STORE ### */
const store = createStore(allReducers, initialState, allEnhancers);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

export { initialState };
