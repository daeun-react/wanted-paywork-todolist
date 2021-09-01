import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'reducer';
import { FilterType, SortType, TodoType } from 'types/todo';
import { TODO_STATUS } from 'utils/constants';
import TodoHeader from 'components/TodoHeader';
import TodoItem from 'components/TodoItem';
import { ReactComponent as Empty } from 'assets/svg/empty.svg';

interface ITodoListProps {
  status: string;
}

const TodoList: React.FC<ITodoListProps> = ({ status }) => {
  const { data } = useSelector((state: RootState) => state.todos);
  const { filter } = useSelector((state: RootState) => state.filter);
  const { sort } = useSelector((state: RootState) => state.sort);

  const colorFilter = filter[status as keyof FilterType];
  const sortName = sort[status as keyof SortType];

  /* 필터 조건에 맞는 Todos 반환 */
  const showTodo = useMemo(() => {
    const todos = data.filter((todo) =>
      status === TODO_STATUS.STARTED
        ? todo.isCheck === false
        : todo.isCheck === true,
    );
    const filteredTodos = colorFilter.length
      ? todos.filter((todo) => colorFilter.includes(todo.color))
      : todos;

    return filteredTodos;
  }, [colorFilter, data, status]);

  /* Todos 정렬 함수 */
  const onSort = (prev: TodoType, next: TodoType) => {
    return sortName === 'create'
      ? prev.id - next.id
      : new Date(prev.due).getTime() - new Date(next.due).getTime();
  };

  /* TodoItem 렌더링 함수, Todos가 없을 경우 Empty svg 렌더링 */
  const renderTodoItem = () =>
    showTodo.length ? (
      <TodoItemWrapper>
        {[...showTodo].sort(onSort).map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </TodoItemWrapper>
    ) : (
      <EmptyWrapper>
        <Empty width="100" height="100" />
      </EmptyWrapper>
    );

  return (
    <Wrapper>
      <TodoHeader status={status} />
      {renderTodoItem()}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const TodoItemWrapper = styled.ul`
  position: relative;
  height: 250px;
  overflow-y: auto;
`;

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;

  svg {
    fill: ${({ theme }) => theme.color.lightGray};
  }
`;

export default TodoList;
