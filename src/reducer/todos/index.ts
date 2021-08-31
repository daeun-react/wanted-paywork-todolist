import { takeEvery, put, call } from 'redux-saga/effects';
import { TodoType } from 'types/todo';
import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  TOGGLE_TODO,
  TOGGLE_TODO_SUCCESS,
  TOGGLE_TODO_FAILURE,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
} from 'reducer/todos/actions';
import { TodosState, TodosAction } from 'reducer/todos/types';
import { asyncState } from 'utils/reducer/reducerUtils';
import * as api from 'api/axios';

function* sagaAsyncTodo(type: string, ApiFunc: any, action?: TodosAction) {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];
  try {
    const result: TodoType[] =
      action && action.payload
        ? yield call(ApiFunc, action.payload)
        : yield call(ApiFunc);
    yield put({ type: SUCCESS, payload: result });
  } catch (error) {
    yield put({ type: FAILURE, payload: error });
  }
}

export function* watchTodos() {
  yield takeEvery(GET_TODOS, () => sagaAsyncTodo(GET_TODOS, api.getTodoAll));
  yield takeEvery(ADD_TODO, (action: TodosAction) =>
    sagaAsyncTodo(ADD_TODO, api.addTodoAPI, action),
  );
  yield takeEvery(TOGGLE_TODO, (action: TodosAction) =>
    sagaAsyncTodo(TOGGLE_TODO, api.toggleTodoAPI, action),
  );
  yield takeEvery(DELETE_TODO, (action: TodosAction) =>
    sagaAsyncTodo(DELETE_TODO, api.deleteTodoAPI, action),
  );
}

const initialState: TodosState = {
  loading: false,
  failure: false,
  data: [],
};

function todos(
  state: TodosState = initialState,
  action: TodosAction,
): TodosState {
  switch (action.type) {
    case GET_TODOS:
    case ADD_TODO:
    case TOGGLE_TODO:
    case DELETE_TODO:
      return asyncState.load(state.data);

    case GET_TODOS_SUCCESS:
      return asyncState.success(action.payload);

    case ADD_TODO_SUCCESS:
      return asyncState.success([...state.data, action.payload]);

    case TOGGLE_TODO_SUCCESS:
      const toggleTodo = state.data.map((todo) =>
        todo.id === Number(action.payload.id)
          ? { ...todo, isCheck: !todo.isCheck }
          : todo,
      );
      return asyncState.success(toggleTodo);

    case DELETE_TODO_SUCCESS:
      const deleteTodo = state.data.filter(
        (todo) => todo.id !== Number(action.payload),
      );
      return asyncState.success(deleteTodo);

    case GET_TODOS_FAILURE:
    case ADD_TODO_FAILURE:
    case TOGGLE_TODO_FAILURE:
    case DELETE_TODO_FAILURE:
      return asyncState.failure();

    default:
      return state;
  }
}

export default todos;
