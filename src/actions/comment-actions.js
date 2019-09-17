import { STEP_SIZE } from '../components/Comment-Components/LoadMore';

export const GET_COMMENTS_PENDING = 'GET_COMMENTS_PENDING'
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COUNTS_PENDING = 'GET_COUNTS_PENDING'
export const GET_COUNTS_SUCCESS = 'GET_COUNTS_SUCCESS';
export const INCREMENT_INDEX = 'INCREMENT_INDEX'
export const UPDATE_API_KEY = 'UPDATE_API_KEY';
export const UPDATE_COURSE_CODE = 'UPDATE_COURSE_CODE';

export function getCommentsPending() {
	return {
		type: GET_COMMENTS_PENDING
	};
}

export function getCommentsSuccess(data) {
	return {
		type: GET_COMMENTS_SUCCESS,
		payload: data
	};
}

export function getCountsPending() {
	return {
		type: GET_COUNTS_PENDING
	};
}

export function getCountsSuccess(data) {
	return {
		type: GET_COUNTS_SUCCESS,
		payload: data
	};
}

export function incrementIndex(index) {
	return {
		type: INCREMENT_INDEX,
		payload: index
	};
}

export function updateApiKey(newVal) {
	return {
		type: UPDATE_API_KEY,
		payload: newVal
	};
}

export function updateCourseCode(newVal) {
	return {
		type: UPDATE_COURSE_CODE,
		payload: newVal
	};
}

export function getComments(apiKey, courseCode, offset) {
	return (dispatch) => {
		dispatch(getCommentsPending());
		fetch(`https://registhor.da-an.ca/api/v1/comments/general/${courseCode}?key=${apiKey}&limit=${STEP_SIZE}&offset=${offset}`)
			.then(resp => resp.json())
			.then(data => {
				dispatch(getCommentsSuccess(data.results));
			});
	}
}

export function getCounts(apiKey, courseCode) {
	return (dispatch) => {
		dispatch(getCountsPending());
		fetch(`https://registhor.da-an.ca/api/v1/counts/general/${courseCode}?key=${apiKey}`)
			.then(resp => resp.json())
			.then(data => {
				dispatch(getCountsSuccess(data.results));
			});
	}
}
