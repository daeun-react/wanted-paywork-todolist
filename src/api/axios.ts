import axios from 'axios';

export const getTodoAll = async () => {
  const response = await axios.get(`/todos`);
  return response.data;
};

export const getTodoById = async (id: number) => {
  const response = await axios.get(`/todos/${id}`);
  return response.data;
};
