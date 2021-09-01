import axios from 'axios';
import { AddTodoType, TodoType } from 'types/todo';
import { BASE_URL, SUCCESS_MESSAGE } from 'utils/constants';

export const axiosCreate = axios.create({
  baseURL: BASE_URL,
});

/* 전체 Todos GET API */
export const getTodoAll = async () => {
  const response = await axiosCreate.get<TodoType[]>('/todo');
  return { msg: SUCCESS_MESSAGE.GET_TODOS, result: response.data };
};

/* Todos Add POST API */
export const addTodoAPI = async (todo: AddTodoType) => {
  const response = await axiosCreate.post<TodoType>('/todo', {
    ...todo,
    createAt: new Date().toISOString(),
  });
  return { msg: SUCCESS_MESSAGE.ADD_TODO, result: response.data };
};

/* Todos 체크 상태값, Toggle PATCH API */
export const toggleTodoAPI = async (payload: {
  id: number;
  isCheck: boolean;
}) => {
  await axiosCreate.patch(`/todo/${payload.id}`, {
    isCheck: payload.isCheck,
  });
  return { msg: SUCCESS_MESSAGE.TOGGLE_TODO, result: payload.id };
};

/* Todos 텍스트 수정 PATCH API */
export const updateTodoAPI = async (payload: {
  id: number;
  content: string;
}) => {
  await axiosCreate.patch(`/todo/${payload.id}`, {
    content: payload.content,
  });
  return {
    msg: SUCCESS_MESSAGE.UPDATE_TODO,
    result: payload.id,
    content: payload.content,
  };
};

/* Todos 삭제 DELETE API */
export const deleteTodoAPI = async (id: number) => {
  await axiosCreate.delete(`/todo/${id}`);
  return { msg: SUCCESS_MESSAGE.DELETE_TODO, result: id };
};
