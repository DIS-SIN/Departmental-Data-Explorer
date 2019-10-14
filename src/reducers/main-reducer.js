import { UPDATE_DEPT_CODE } from '../actions/main-actions';
import { initialState } from '../';

export function mainReducer(state = initialState.mainReducer, action) {
	switch(action.type) {
		case UPDATE_DEPT_CODE:
			return {
				...state,
				deptCode: action.payload
			};
		default:
			return state;
	}
}
