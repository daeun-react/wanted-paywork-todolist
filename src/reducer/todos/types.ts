import * as actions from 'reducer/todos/actions';
import { TodoType } from 'types/todo';

export type TodosState = {
  loading: boolean;
  data: TodoType[];
  failure: boolean;
};

export type TodosAction =
  | ReturnType<typeof actions.getTodos>
  | ReturnType<typeof actions.getTodosSuccess>
  | ReturnType<typeof actions.getTodosFailure>;
