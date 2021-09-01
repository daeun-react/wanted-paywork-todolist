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
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
} from 'reducer/todos/actions';
import { TodosState, TodosAction } from 'reducer/todos/types';
import { ERROR_MESSAGE } from 'utils/constants';
import { asyncState } from 'utils/reducer/reducerUtils';
import * as api from 'api/axios';

function* sagaAsyncTodo(type: string, ApiFunc: any, action?: TodosAction) {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];
  try {
    const response: {
      msg: string;
      result: TodoType[] | number;
      content?: string;
    } =
      action && action.payload
        ? yield call(ApiFunc, action.payload)
        : yield call(ApiFunc);

    yield put({ type: SUCCESS, payload: response });
  } catch (error) {
    yield put({
      type: FAILURE,
      payload: ERROR_MESSAGE[type],
    });
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
  yield takeEvery(UPDATE_TODO, (action: TodosAction) =>
    sagaAsyncTodo(UPDATE_TODO, api.updateTodoAPI, action),
  );
}

const initialState: TodosState = {
  loading: false,
  failure: false,
  activeTodoId: 0,
  msg: '',
  data: [],
};

function todos(
  state: TodosState = initialState,
  action: TodosAction,
): TodosState {
  switch (action.type) {
    case GET_TODOS:
      return asyncState.load(state.data);

    case ADD_TODO:
    case TOGGLE_TODO:
    case DELETE_TODO:
    case UPDATE_TODO:
      return asyncState.init(state.data);

    case GET_TODOS_SUCCESS:
      return asyncState.success(action.payload.msg, 0, action.payload.result);

    case ADD_TODO_SUCCESS:
      return asyncState.success(action.payload.msg, action.payload.result.id, [
        action.payload.result,
        ...state.data,
      ]);

    case TOGGLE_TODO_SUCCESS:
      const toggleTodo = state.data.map((todo) =>
        todo.id === action.payload.result
          ? { ...todo, isCheck: !todo.isCheck }
          : todo,
      );
      return asyncState.success(
        action.payload.msg,
        action.payload.result,
        toggleTodo,
      );

    case DELETE_TODO_SUCCESS:
      const deleteTodo = state.data.filter(
        (todo) => todo.id !== action.payload.result,
      );
      return asyncState.success(
        action.payload.msg,
        action.payload.result,
        deleteTodo,
      );

    case UPDATE_TODO_SUCCESS:
      const updateTodo = state.data.map((todo) =>
        todo.id === action.payload.result
          ? { ...todo, content: action.payload.content }
          : todo,
      );
      return asyncState.success(
        action.payload.msg,
        action.payload.result,
        updateTodo,
      );

    case GET_TODOS_FAILURE:
    case ADD_TODO_FAILURE:
    case TOGGLE_TODO_FAILURE:
    case DELETE_TODO_FAILURE:
    case UPDATE_TODO_FAILURE:
      return asyncState.failure(action.payload);

    default:
      return state;
  }
}

export default todos;
