import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import styled, { css } from 'styled-components';
import { AddTodoType, Color } from 'types/todo';
import getDate from 'utils/date';
import { COLOR_LIST, DATE_OPTION } from 'utils/constants';
import { addTodo } from 'reducer/todos/actions';
import { ReactComponent as Calender } from 'assets/svg/calendar.svg';
import { ReactComponent as Checked } from 'assets/svg/check.svg';
import { ReactComponent as XMark } from 'assets/svg/xmark.svg';

interface ITodoCreateProps {}

const TodoCreate: React.FC<ITodoCreateProps> = (props) => {
  const today = new Date();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [due, setDue] = useState<Date>(today);

  const customInput = (
    <CustomDateInput>
      완료일 선택:
      <Calender width="18" height="18" />
      {getDate(due, DATE_OPTION)}
    </CustomDateInput>
  );

  const renderColorButton = () => {
    return COLOR_LIST.map((color) => (
      <ColorButton
        key={color}
        type="button"
        color={color}
        selected={color === selectedColor}
        onClick={() => handleColorClick(color as Color)}
      >
        <Checked width="12" height="12" />
      </ColorButton>
    ));
  };

  const initializeState = () => {
    setDue(today);
    setContent('');
    setSelectedColor(null);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      initializeState();
    }
    setContent(e.target.value);
  };

  const handleDueChange = (selectedDate: Date) => {
    setDue(selectedDate);
  };

  const handleColorClick = (color: Color) => {
    setSelectedColor(selectedColor === color ? null : color);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!content || !selectedColor) return;
    const newTodo: AddTodoType = {
      content,
      isCheck: false,
      color: selectedColor,
      due: due.toISOString(),
    };

    dispatch(addTodo(newTodo));
    initializeState();
  };

  const isWrite = content.trim().length > 0;
  const isActive = isWrite && !!selectedColor;

  return (
    <Form>
      <TodoInput
        placeholder="할 일을 입력해주세요."
        value={content}
        onChange={handleContentChange}
      />
      <SelectWrapper isWrite={isWrite}>
        <Left>
          <DateWrapper>
            <DatePicker
              selected={due}
              onChange={handleDueChange}
              minDate={today}
              customInput={customInput}
            />
          </DateWrapper>
          <ColorsWrapper>
            색상 선택:
            {renderColorButton()}
          </ColorsWrapper>
        </Left>
        <SubmitButton
          type="submit"
          disabled={!isActive}
          isActive={isActive}
          onClick={handleSubmit}
        >
          <XMark width="12" height="12" /> 추가
        </SubmitButton>
      </SelectWrapper>
    </Form>
  );
};

const Form = styled.form`
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 10px;
`;

const TodoInput = styled.input`
  width: 100%;
  height: 30px;
  &::placeholder {
    color: ${({ theme }) => theme.color.gray};
  }
`;

const SelectWrapper = styled.div<{ isWrite: boolean }>`
  display: none;
  height: 40px;
  padding-top: 4px;
  border-top: 1px solid ${({ theme }) => theme.color.lightGray};
  color: ${({ theme }) => theme.color.white};
  font-size: 12px;

  ${({ isWrite }) =>
    isWrite &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `};
`;

const Left = styled.div`
  display: flex;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-right: 4px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.color.gray};
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;

  svg {
    margin: 1px 2px 0 2px;
    fill: ${({ theme }) => theme.color.white};
  }
`;

const CustomDateInput = styled.div`
  display: flex;
  align-items: center;
`;

const ColorsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.color.gray};
  border-radius: 4px;
  padding: 0 10px;
`;

const ColorButton = styled.button<{ color: string; selected: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  margin: 4px;
  border-radius: 50%;
  background-color: ${({ theme, color }) => theme.color[color]};

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: ${({ theme }) => theme.color.white};
    display: ${({ selected }) => (selected ? 'block' : 'none')};
  }

  & + & {
    margin-left: 8px;
  }
`;

const SubmitButton = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.color.green : theme.color.lightGray};
  border-radius: 4px;
  color: ${({ theme }) => theme.color.white};
  transition: 0.125s all ease-in;

  svg {
    margin-right: 2px;
    fill: ${({ theme }) => theme.color.white};
    ${({ isActive }) =>
      isActive &&
      css`
        transform: rotate(45deg);
      `};
  }
`;

export default TodoCreate;
