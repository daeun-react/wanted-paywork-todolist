import { AxiosError } from 'axios';
import { TodoType } from 'types/todo';

export const GET_TODOS = 'todos/GET_TODOS' as const;
export const GET_TODOS_SUCCESS = 'todos/GET_TODOS_SUCCESS' as const;
export const GET_TODOS_FAILURE = 'todos/GET_TODOS_FAILURE' as const;

export const getTodos = () => ({ type: GET_TODOS });
export const getTodosSuccess = (payload: TodoType) => ({
  type: GET_TODOS_SUCCESS,
  payload,
});
export const getTodosFailure = (error: AxiosError) => ({
  type: GET_TODOS_FAILURE,
  payload: error,
});
