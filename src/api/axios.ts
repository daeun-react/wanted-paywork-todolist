import axios from 'axios';
import { AddTodoType, TodoType } from 'types/todo';
import { BASE_URL } from 'utils/constants';

export const axiosCreate = axios.create({
  baseURL: BASE_URL,
});

export const getTodoAll = async () => {
  const response = await axiosCreate.get<TodoType[]>('/todo');
  return response.data;
};

export const getTodoById = async (id: number) => {
  const response = await axiosCreate.get<TodoType>(`/todo/${id}`);
  return response.data;
};

export const addTodoAPI = async (todo: AddTodoType) => {
  const response = await axiosCreate.post<TodoType>('/todo', {
    ...todo,
    createAt: new Date().toISOString(),
  });
  return response.data;
};

export const toggleTodoAPI = async (todo: TodoType) => {
  const response = await axiosCreate.put<TodoType>(`/todo/${todo.id}`, todo);
  return response.data;
};

export const deleteTodoAPI = async (id: number) => {
  await axiosCreate.delete(`/todo/${id}`);
  return id;
};
