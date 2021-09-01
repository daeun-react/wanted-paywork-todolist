import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { getTodos } from 'reducer/todos/actions';
import { TODO_STATUS } from 'utils/constants';
import Spinner from 'components/common/Spinner';
import ErrorMessage from 'components/common/ErrorMessage';
import TodoCreate from 'components/TodoCreate';
import TodoList from 'components/TodoList';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, failure, msg } = useSelector(
    (state: RootState) => state.todos,
  );

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  if (loading)
    return (
      <Container>
        <Spinner />
      </Container>
    );
  if (failure)
    return (
      <Container>
        <ErrorMessage msg={msg} />
      </Container>
    );

  return (
    <>
      <Container>
        <TodoWrapper>
          <TodoCreate />
          <TodoList status={TODO_STATUS.STARTED} />
          <TodoList status={TODO_STATUS.FINISHED} />
        </TodoWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to top, #000000, #434343);
`;

const TodoWrapper = styled.div`
  width: 700px;
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
`;

export default App;
