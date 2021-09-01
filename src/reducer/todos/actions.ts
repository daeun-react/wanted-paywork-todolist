import { TodoType, AddTodoType } from 'types/todo';

export const GET_TODOS = 'todos/GET_TODOS' as const;
export const GET_TODOS_SUCCESS = 'todos/GET_TODOS_SUCCESS' as const;
export const GET_TODOS_FAILURE = 'todos/GET_TODOS_FAILURE' as const;

export const ADD_TODO = 'todo/ADD_TODO' as const;
export const ADD_TODO_SUCCESS = 'todo/ADD_TODO_SUCCESS' as const;
export const ADD_TODO_FAILURE = 'todo/ADD_TODO_FAILURE' as const;

export const TOGGLE_TODO = 'todo/TOGGLE_TODO' as const;
export const TOGGLE_TODO_SUCCESS = 'todo/TOGGLE_TODO_SUCCESS' as const;
export const TOGGLE_TODO_FAILURE = 'todo/TOGGLE_TODO_FAILURE' as const;

export const DELETE_TODO = 'todo/DELTE_TODO' as const;
export const DELETE_TODO_SUCCESS = 'todo/DELTE_TODO_SUCCESS' as const;
export const DELETE_TODO_FAILURE = 'todo/DELTE_TODO_FAILURE' as const;

export const UPDATE_TODO = 'todo/UPDATE_TODO' as const;
export const UPDATE_TODO_SUCCESS = 'todo/UPDATE_TODO_SUCCESS' as const;
export const UPDATE_TODO_FAILURE = 'todo/UPDATE_TODO_FAILURE' as const;

export const getTodos = () => ({ type: GET_TODOS, payload: null });

export const getTodosSuccess = (payload: {
  msg: string;
  result: TodoType[];
}) => ({
  type: GET_TODOS_SUCCESS,
  payload,
});

export const getTodosFailure = (msg: string) => ({
  type: GET_TODOS_FAILURE,
  payload: msg,
});

export const addTodo = (todo: AddTodoType) => ({
  type: ADD_TODO,
  payload: todo,
});

export const addTodoSuccess = (payload: { msg: string; result: TodoType }) => ({
  type: ADD_TODO_SUCCESS,
  payload,
});

export const addTodoFailure = (msg: string) => ({
  type: ADD_TODO_FAILURE,
  payload: msg,
});

export const toggleTodo = (id: number, isCheck: boolean) => ({
  type: TOGGLE_TODO,
  payload: { id, isCheck },
});

export const toggleTodoSuccess = (payload: {
  msg: string;
  result: number;
}) => ({
  type: TOGGLE_TODO_SUCCESS,
  payload,
});

export const toggleTodoFailure = (msg: string) => ({
  type: TOGGLE_TODO_FAILURE,
  payload: msg,
});

export const deleteTodo = (id: number) => ({ type: DELETE_TODO, payload: id });

export const deleteTodoSuccess = (payload: {
  msg: string;
  result: number;
}) => ({
  type: DELETE_TODO_SUCCESS,
  payload,
});

export const deleteTodoFailure = (msg: string) => ({
  type: DELETE_TODO_FAILURE,
  payload: msg,
});

export const updateTodo = (id: number, content: string) => ({
  type: UPDATE_TODO,
  payload: { id, content },
});

export const updateTodoSuccess = (payload: {
  msg: string;
  result: number;
  content: string;
}) => ({
  type: UPDATE_TODO_SUCCESS,
  payload,
});

export const updateTodoFailure = (msg: string) => ({
  type: UPDATE_TODO_FAILURE,
  payload: msg,
});
