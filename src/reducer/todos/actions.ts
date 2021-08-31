import { AxiosError } from 'axios';
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

export const getTodos = () => ({ type: GET_TODOS, payload: null });

export const getTodosSuccess = (payload: TodoType[]) => ({
  type: GET_TODOS_SUCCESS,
  payload,
});

export const getTodosFailure = (error: AxiosError) => ({
  type: GET_TODOS_FAILURE,
  payload: error,
});

export const addTodo = (todo: AddTodoType) => ({
  type: ADD_TODO,
  payload: todo,
});

export const addTodoSuccess = (payload: TodoType) => ({
  type: ADD_TODO_SUCCESS,
  payload,
});

export const addTodoFailure = (error: AxiosError) => ({
  type: ADD_TODO_FAILURE,
  payload: error,
});

export const toggleTodo = (todo: TodoType) => ({
  type: TOGGLE_TODO,
  payload: todo,
});

export const toggleTodoSuccess = (payload: TodoType) => ({
  type: TOGGLE_TODO_SUCCESS,
  payload,
});

export const toggleTodoFailure = (error: AxiosError) => ({
  type: TOGGLE_TODO_FAILURE,
  payload: error,
});

export const deleteTodo = (id: number) => ({ type: DELETE_TODO, payload: id });

export const deleteTodoSuccess = (payload: TodoType) => ({
  type: DELETE_TODO_SUCCESS,
  payload,
});

export const deleteTodoFailure = (error: AxiosError) => ({
  type: DELETE_TODO_FAILURE,
  payload: error,
});
