export function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, 'newTodo'];
    default:
      return state;
  }
}
