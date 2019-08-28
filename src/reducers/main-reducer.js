import { LOGIN } from '../actions/main-actions';
import { initialState } from '../';

export function mainReducer(state = initialState.mainReducer, action) {
	switch(action.type) {
		default:
			return state;
	}
}
