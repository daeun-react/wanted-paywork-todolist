import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import { deleteTodo, getTodos, toggleTodo } from 'reducer/todos/actions';
import TodoCreate from 'components/TodoCreate';
import { TodoType } from 'types/todo';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, failure, data } = useSelector(
    (state: RootState) => state.todos,
  );

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  // if (loading) return <div>로딩중...</div>;
  // if (failure) return <div>{'api 호출 실패...'}</div>;

  const onToggle = (todo: TodoType) => {
    const newTodo: TodoType = { ...todo, isCheck: !todo.isCheck };
    dispatch(toggleTodo(newTodo));
  };

  const onDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <Container>
      <TodoWrapper>
        <TodoCreate />
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.isCheck}
                onChange={() => onToggle(item)}
              />
              {item.content}
              <button onClick={() => onDelete(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </TodoWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.indigo};
`;

const TodoWrapper = styled.div`
  width: 768px;
  height: 500px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
`;

export default App;
