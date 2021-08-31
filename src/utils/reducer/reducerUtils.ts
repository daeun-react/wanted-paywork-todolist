import { TodosState } from 'reducer/todos/types';
import { TodoType } from 'types/todo';

export const asyncState = {
  load: (data: TodoType[]): TodosState => ({
    loading: true,
    failure: false,
    data,
  }),
  success: (data: TodoType[]): TodosState => ({
    loading: false,
    failure: false,
    data,
  }),
  failure: (): TodosState => ({
    loading: false,
    failure: true,
    data: [],
  }),
};
