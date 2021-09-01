import axios from 'axios';
import { AddTodoType, TodoType } from 'types/todo';
import { BASE_URL, SUCCESS_MESSAGE } from 'utils/constants';

export const axiosCreate = axios.create({
  baseURL: BASE_URL,
});

export const getTodoAll = async () => {
  const response = await axiosCreate.get<TodoType[]>('/todo');
  return { msg: SUCCESS_MESSAGE.GET_TODOS, result: response.data };
};

// export const getTodoById = async (id: number) => {
//   const response = await axiosCreate.get<TodoType>(`/todo/${id}`);
//   return response.data;
// };

export const addTodoAPI = async (todo: AddTodoType) => {
  const response = await axiosCreate.post<TodoType>('/todo', {
    ...todo,
    createAt: new Date().toISOString(),
  });
  return { msg: SUCCESS_MESSAGE.ADD_TODO, result: response.data };
};

export const toggleTodoAPI = async (payload: {
  id: number;
  isCheck: boolean;
}) => {
  await axiosCreate.patch(`/todo/${payload.id}`, {
    isCheck: payload.isCheck,
  });
  return { msg: SUCCESS_MESSAGE.TOGGLE_TODO, result: payload.id };
};

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

export const deleteTodoAPI = async (id: number) => {
  await axiosCreate.delete(`/todo/${id}`);
  return { msg: SUCCESS_MESSAGE.DELETE_TODO, result: id };
};

// export const deleteTodoAPI = async (id: number) => {
//   await axiosCreate.delete(`/todo/${id}`);
//   return id;
// };
