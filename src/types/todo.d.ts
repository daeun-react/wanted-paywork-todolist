export type TodoType = {
  id: number;
  content: string;
  isCheck: boolean;
  createAt: string;
  color: Color;
  due: string;
};

export type AddTodoType = {
  content: string;
  isCheck: boolean;
  color: Color;
  due: string;
};

export type Color = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple';

export type ObjectStringType = {
  [key: string]: string;
};

export type ObjectNumberType = {
  [key: string]: number;
};
