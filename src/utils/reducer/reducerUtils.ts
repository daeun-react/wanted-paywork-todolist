import { TodosState } from 'reducer/todos/types';
import { TodoType } from 'types/todo';

export const asyncState = {
  load: (data: TodoType[]): TodosState => ({
    loading: true,
    failure: false,
    activeTodoId: 0,
    msg: '',
    data,
  }),

  init: (data: TodoType[]): TodosState => ({
    loading: false,
    failure: false,
    activeTodoId: 0,
    msg: '',
    data,
  }),

  success: (
    msg: string,
    activeTodoId: number,
    data: TodoType[],
  ): TodosState => ({
    loading: false,
    failure: false,
    activeTodoId,
    msg,
    data,
  }),

  failure: (msg: string): TodosState => ({
    loading: false,
    failure: true,
    activeTodoId: 0,
    msg,
    data: [],
  }),
};
