import { GET_COMMENTS_PENDING, GET_COMMENTS_SUCCESS, GET_COUNTS_PENDING, GET_COUNTS_SUCCESS, INCREMENT_INDEX, RESET_ALL, UPDATE_COURSE_CODE } from '../actions/comment-actions';
import { initialState } from '../';
import { STEP_SIZE } from '../components/Comment-Components/LoadMore';

export function commentReducer(state = initialState.commentReducer, action) {
	switch(action.type) {
		case GET_COMMENTS_PENDING:
			return {
				...state,
				commentsPending: {
					...state.commentsPending,
					[action.payload]: true
				}
			};
		case GET_COMMENTS_SUCCESS:
			return {
				...state,
				comments: {
					...state.comments,
					[action.payload.commentType]: [
						...state.comments[action.payload.commentType],
						...action.payload.data
					]
				},
				commentsPending: {
					...state.commentsPending,
					[action.payload.commentType]: false
				}
			};
		case GET_COUNTS_PENDING:
			return {
				...state,
				countsPending: {
					...state.countsPending,
					[action.payload]: true
				}
			};
		case GET_COUNTS_SUCCESS:
			return {
				...state,
				counts: {
					...state.counts,
					[action.payload.commentType]: action.payload.data
				},
				countsPending: {
					...state.countsPending,
					[action.payload.commentType]: false
				}
			};
		case INCREMENT_INDEX:
			return {
				...state,
				currentIndices: {
					...state.currentIndices,
					[action.payload]: (state.currentIndices[action.payload] + STEP_SIZE) || STEP_SIZE
				}
			};
		case RESET_ALL:
			return {
				...state,
				comments: {
					...state.comments,
					[action.payload]: []
				},
				commentsPending: {
					...state.commentsPending,
					[action.payload]: false
				},
				counts: {
					...state.counts,
					[action.payload]: {}
				},
				countsPending: {
					...state.countsPending,
					[action.payload]: false
				},
				currentIndices: {
					...state.currentIndices,
					[action.payload]: 0
				},
				optionalFilters: {
					...state.optionalFilters,
					[action.payload]: { courseCode: '' }
				}
			};
		default:
			return state;
	}
}
