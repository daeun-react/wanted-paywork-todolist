import { ActionType } from 'typesafe-actions';
import { TodoType } from 'types/todo';
import * as actions from 'reducer/todos/actions';

export type TodosState = {
  loading: boolean;
  failure: boolean;
  data: TodoType[];
};

export type TodosAction = ActionType<typeof actions>;
