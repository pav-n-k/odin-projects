export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const EDIT_PROJECT = 'EDIT_PROJECT';
export const EDIT_TODO = 'EDIT_TODO';

export const addTodo = (title, projectId) => ({
  type: ADD_TODO,
  payload: { title, projectId },
});
