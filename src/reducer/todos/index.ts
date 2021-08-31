import { takeEvery, put, call } from 'redux-saga/effects';
import { getTodoAll } from 'api/axios';
import { TodoType } from 'types/todo';
import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
} from 'reducer/todos/actions';
import { TodosAction, TodosState } from 'reducer/todos/types';

function* sagaGetItems(type: string) {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];
  try {
    const payload: TodoType = yield call(getTodoAll);
    yield put({ type: SUCCESS, payload });
  } catch (error) {
    yield put({ type: FAILURE, payload: error });
  }
}

export function* watchTodos() {
  yield takeEvery(GET_TODOS, () => sagaGetItems(GET_TODOS));
}

const initialState: TodosState = {
  loading: false,
  failure: false,
  data: [],
};

function todos(state: TodosState = initialState, action: TodosAction) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        loading: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        failure: true,
        data: [],
      };
    default:
      return state;
  }
}

export default todos;
