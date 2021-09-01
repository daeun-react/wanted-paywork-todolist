import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import todos, { watchTodos } from 'reducer/todos';
import filter from 'reducer/filter';
import sort from 'reducer/sort';

const rootReducer = combineReducers({ todos, filter, sort });

export function* rootSaga() {
  yield all([watchTodos()]);
}
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
