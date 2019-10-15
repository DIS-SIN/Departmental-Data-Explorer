import { STEP_SIZE } from '../components/Comment-Components/LoadMore';

export const GET_COMMENTS_PENDING = 'GET_COMMENTS_PENDING';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COUNTS_PENDING = 'GET_COUNTS_PENDING';
export const GET_COUNTS_SUCCESS = 'GET_COUNTS_SUCCESS';
export const INCREMENT_INDEX = 'INCREMENT_INDEX';
export const UPDATE_COURSE_CODE = 'UPDATE_COURSE_CODE';

export function getCommentsPending(commentType) {
	return {
		type: GET_COMMENTS_PENDING,
		payload: commentType
	};
}

export function getCommentsSuccess(commentType, data) {
	return {
		type: GET_COMMENTS_SUCCESS,
		payload: { commentType: commentType, data: data }
	};
}

export function getCountsPending(commentType) {
	return {
		type: GET_COUNTS_PENDING,
		payload: commentType
	};
}

export function getCountsSuccess(commentType, data) {
	return {
		type: GET_COUNTS_SUCCESS,
		payload: { commentType: commentType, data: data }
	};
}

export function incrementIndex(commentType) {
	return {
		type: INCREMENT_INDEX,
		payload: commentType
	};
}

export function getComments(apiKey, commentType, courseCode, deptCode, offset) {
	return (dispatch) => {
		dispatch(getCommentsPending(commentType));
		fetch(`https://registhor.da-an.ca/api/v1/comments/text/${commentType}?key=${apiKey}&course_code=${courseCode}&department_code=${deptCode}&limit=${STEP_SIZE}&offset=${offset}`)
			.then(resp => resp.json())
			.then(data => {
				dispatch(getCommentsSuccess(commentType, data.results));
			});
	}
}

export function getCounts(apiKey, commentType, courseCode, deptCode) {
	return (dispatch) => {
		dispatch(getCountsPending(commentType));
		fetch(`https://registhor.da-an.ca/api/v1/comments/counts/${commentType}?key=${apiKey}&course_code=${courseCode}&department_code=${deptCode}`)
			.then(resp => resp.json())
			.then(data => {
				dispatch(getCountsSuccess(commentType, data.results));
			});
	}
}
