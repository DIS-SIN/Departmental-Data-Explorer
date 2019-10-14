export const UPDATE_DEPT_CODE = 'UPDATE_DEPT_CODE';

export function updateDeptCode(newVal) {
	return {
		type: UPDATE_DEPT_CODE,
		payload: newVal
	};
}
