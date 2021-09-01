import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Color, TodoType } from 'types/todo';
import { toggleTodo } from 'reducer/todos/actions';
import { ReactComponent as Checked } from 'assets/svg/check.svg';

interface ICheckBoxProps {
  todo: TodoType;
}

const CheckBox: React.FC<ICheckBoxProps> = ({ todo }) => {
  const { id, isCheck, color } = todo;
  const dispatch = useDispatch();

  /* 체크버튼 클릭 시 isCheck 상태값 변경 */
  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleTodo(id, e.target.checked));
  };

  return (
    <Label>
      <HiddenCheckbox
        checked={isCheck}
        onChange={(e) => handleCheckBoxChange(e)}
      />
      <StyledCheckbox checked={isCheck} color={color}>
        <Checked width="12" height="12" />
      </StyledCheckbox>
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  align-items: center;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  white-space: nowrap;
  width: 1px;
  cursor: pointer;
`;

const StyledCheckbox = styled.div<{ checked: boolean; color: Color }>`
  position: relative;
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme, color }) => theme.color[color]};
  border-radius: 3px;
  transition: all 150ms;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: ${({ theme, color }) => theme.color[color]};
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;

export default CheckBox;
