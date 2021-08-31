import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { AddTodoType } from 'types/todo';
import { addTodo } from 'reducer/todos/actions';

interface ITodoCreateProps {}

const TodoCreate: React.FC<ITodoCreateProps> = (props) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newTodo: AddTodoType = {
      content,
      isCheck: false,
      color: 'red',
    };

    dispatch(addTodo(newTodo));
    setContent('');
  };

  return (
    <Form>
      <InputContainer>
        <TodoInput
          placeholder="할 일을 입력해주세요."
          value={content}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>+</Button>
      </InputContainer>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-self: flex-start;
  font-size: 12px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 5px;
`;

const TodoInput = styled.input`
  flex-grow: 1;
  min-height: 32px;
  padding: 4px;
  font-size: 18px;

  &::placeholder {
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

const Button = styled.button`
  width: 35px;
  height: 35px;
  padding: 8px;
  background-color: ${({ theme }) => theme.color.red};
  border-radius: 5px;
  color: ${({ theme }) => theme.color.white};
  font-size: 16px;
`;

export default TodoCreate;
