import { GET_COMMENTS_PENDING, GET_COMMENTS_SUCCESS, GET_COUNTS_PENDING, GET_COUNTS_SUCCESS, INCREMENT_INDEX, UPDATE_API_KEY, UPDATE_COURSE_CODE } from '../actions/comment-actions';
import { initialState } from '../';
import { STEP_SIZE } from '../components/Comment-Components/LoadMore';

export function commentReducer(state = initialState.commentReducer, action) {
	switch(action.type) {
		case GET_COMMENTS_PENDING:
			return {
				...state,
				commentsPending: true
			};
		case GET_COMMENTS_SUCCESS:
			return {
				...state,
				comments: [
					...state.comments,
					...action.payload
				],
				commentsPending: false
			};
		case GET_COUNTS_PENDING:
			return {
				...state,
				countsPending: true
			};
		case GET_COUNTS_SUCCESS:
			return {
				...state,
				counts: action.payload,
				countsPending: false
			};
		case INCREMENT_INDEX:
			return {
				...state,
				currentIndices: {
					...state.currentIndices,
					// Computed property name ;)
					[action.payload]: (state.currentIndices[action.payload] + STEP_SIZE) || STEP_SIZE
				}
			};
		case UPDATE_API_KEY:
			return {
				...state,
				apiKey: action.payload
			};
		case UPDATE_COURSE_CODE:
			return {
				...state,
				courseCode: action.payload
			};
		default:
			return state;
	}
}
