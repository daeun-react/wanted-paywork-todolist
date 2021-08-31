import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import todos, { watchTodos } from 'reducer/todos';

const rootReducer = combineReducers({ todos });

export function* rootSaga() {
  yield all([watchTodos()]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
