type color = 'red' | 'orange' | 'yellow' | 'green' | 'blue';

export type TodoType = {
  id: number;
  content: string;
  isCheck: boolean;
  createAt: string;
  color: color;
};

export type AddTodoType = {
  content: string;
  isCheck: boolean;
  color: color;
};
