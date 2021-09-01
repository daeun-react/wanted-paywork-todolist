import {
  ADD_TODO,
  DELETE_TODO,
  GET_TODOS,
  TOGGLE_TODO,
  UPDATE_TODO,
} from 'reducer/todos/actions';
import { ObjectStringType } from 'types/todo';

export const BASE_URL = 'http://paywork-todo.herokuapp.com/';
export const TIME_ZONE: string = 'ko-KR';
export const DATE_OPTION: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
};

export const DATE_OPTION_ITEM: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const TODO_STATUS: ObjectStringType = {
  STARTED: 'START',
  FINISHED: 'FINISH',
};

export const COLOR_LIST: string[] = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
];

export const SORT_LIST: ObjectStringType = {
  create: '생성순',
  due: '마감임박순',
};

export const SUCCESS_MESSAGE: ObjectStringType = {
  GET_TODOS: 'TodoList 불러오기 성공!',
  ADD_TODO: 'TodoList 추가 성공!',
  TOGGLE_TODO: 'TodoList 토글 성공!',
  DELETE_TODO: 'TodoList 삭제 성공!',
  UPDATE_TODO: 'TodoList 수정 성공!',
};

export const ERROR_MESSAGE: ObjectStringType = {
  [GET_TODOS]: 'TodoList 불러오기 실패!',
  [ADD_TODO]: 'TodoList 추가 실패!',
  [TOGGLE_TODO]: 'TodoList 토글 실패!',
  [DELETE_TODO]: 'TodoList 삭제 실패!',
  [UPDATE_TODO]: 'TodoList 수정 실패!',
};
