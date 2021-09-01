import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { TodoType } from 'types/todo';
import getDate from 'utils/date';
import { DATE_OPTION_ITEM } from 'utils/constants';
import { RootState } from 'reducer';
import { deleteTodo, updateTodo } from 'reducer/todos/actions';
import CheckBox from 'components/common/CheckBox';
import { ReactComponent as TrashCan } from 'assets/svg/trash_can.svg';
import { ReactComponent as Edit } from 'assets/svg/edit.svg';

interface ITodoItemProps {
  todo: TodoType;
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const { activeTodoId } = useSelector((state: RootState) => state.todos);
  const [editContent, setEditContent] = useState<string>(todo.content);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const handleUpdate = () => {
    dispatch(updateTodo(todo.id, editContent));
    setEditMode(!isEditMode);
  };

  const handleEditMode = () => {
    setEditMode(!isEditMode);
  };

  const handleEditContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const gap =
    new Date().setHours(0, 0, 0, 0).valueOf() -
    new Date(todo.due).setHours(0, 0, 0, 0).valueOf();
  const result = Math.floor(gap / (1000 * 60 * 60 * 24));
  const DDay = result > 0 ? `D+${result}` : `D-${Math.abs(result)}`;

  return (
    <TodoItemWrapper isActive={todo.id === activeTodoId}>
      <LeftWrapper>
        <ColorBlock color={todo.color} />
        <CheckBox todo={todo} />
        {isEditMode ? (
          <EditWrapper>
            <EditInput
              type="text"
              value={editContent}
              onChange={handleEditContent}
            />
            <EditButton onClick={handleUpdate}>수정</EditButton>
          </EditWrapper>
        ) : (
          <>
            <Content isCheck={todo.isCheck}> {todo.content}</Content>
            <EditSvg width="12" height="12" onClick={handleEditMode} />
          </>
        )}
      </LeftWrapper>
      <RightWrapper>
        <DueDate>
          <DDayDiv passed={result > 0}> {DDay}</DDayDiv>
          {getDate(new Date(todo.due), DATE_OPTION_ITEM)}
        </DueDate>
        {todo.isCheck && (
          <TrashCan width="12" height="12" onClick={handleDelete} />
        )}
      </RightWrapper>
    </TodoItemWrapper>
  );
};

export default TodoItem;

const TodoItemWrapper = styled.li<{ isActive: boolean }>`
  display: flex;
  height: 30px;
  transition: 0.125s all ease-in;

  ${({ isActive }) =>
    isActive &&
    css`
      animation: show 1s linear both;
    `}

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  & + & {
    border-top: 1px solid ${({ theme }) => theme.color.lightGray};
  }
`;

const LeftWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
`;

const EditSvg = styled(Edit)`
  position: absolute;
  right: 0;
  margin-left: 4px;
  cursor: pointer;
  fill: ${({ theme }) => theme.color.gray};

  &:hover {
    fill: ${({ theme }) => theme.color.green};
  }
`;

const ColorBlock = styled.div<{ color: string }>`
  width: 12px;
  height: 100%;
  background-color: ${({ theme, color }) => theme.color[color]};
  margin-right: 8px;
`;

const Content = styled.h3<{ isCheck: boolean }>`
  margin-left: 8px;
  font-size: 14px;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ isCheck }) =>
    isCheck &&
    css`
      color: ${({ theme }) => theme.color.gray};
      text-decoration: line-through;
    `}
`;

const EditWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 4px;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 4px;
`;

const EditInput = styled.input`
  margin-left: 8px;
  width: 100%;
`;

const EditButton = styled.button`
  margin: 4px;
  background-color: ${({ theme }) => theme.color.green};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.white};
  font-size: 10px;
  white-space: nowrap;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;

  svg {
    fill: ${({ theme }) => theme.color.red};
    cursor: pointer;
  }
`;

const DueDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  padding: 4px;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.gray};
  font-size: 12px;
  white-space: nowrap;
`;

const DDayDiv = styled.div<{ passed: boolean }>`
  width: 40px;
  text-align: center;
  margin-left: 10px;
  padding: 3px 5px;
  background-color: ${({ passed, theme }) =>
    passed ? theme.color.lightRed : theme.color.lightGreen};
  border-radius: 3px;
  font-weight: 500;
`;
