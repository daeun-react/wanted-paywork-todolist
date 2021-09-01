import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FilterType, SortType, ObjectNumberType } from 'types/todo';
import { SORT_LIST, COLOR_LIST, TODO_STATUS } from 'utils/constants';
import { RootState } from 'reducer';
import { toggleFilter } from 'reducer/filter';
import { setSort } from 'reducer/sort';
import { ReactComponent as Start } from 'assets/svg/list_start.svg';
import { ReactComponent as Finish } from 'assets/svg/list_finish.svg';

interface ITodoHeaderProps {
  status: string;
}

const TodoHeader: React.FC<ITodoHeaderProps> = ({ status }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.todos);
  const { filter } = useSelector((state: RootState) => state.filter);
  const { sort } = useSelector((state: RootState) => state.sort);

  const colorFilter = filter[status as keyof FilterType];
  const sortName = sort[status as keyof SortType];

  /* 컬러별 TodoList 개수 확인 */
  const todoColorNums = useMemo(() => {
    const todos = data.filter((todo) =>
      status === TODO_STATUS.STARTED
        ? todo.isCheck === false
        : todo.isCheck === true,
    );

    const colors: ObjectNumberType = COLOR_LIST.reduce(
      (acc: ObjectNumberType, cur: string) => {
        acc[cur] = todos.filter((todo) => todo.color === cur).length;
        return acc;
      },
      {},
    );
    return colors;
  }, [status, data]);

  /* 컬러별 필터링 버튼 UI 컴포넌트 반환 */
  const renderColor = (Colors: ObjectNumberType) =>
    Object.keys(Colors).map((item) => (
      <ColorButton
        key={item}
        isActive={colorFilter.includes(item)}
        onClick={() => handleColorClick(item)}
      >
        <Circle color={item} />
        <p>{Colors[item]}개</p>
      </ColorButton>
    ));

  /* 컬러 클릭 시, 해당 색상 필터링 적용 */
  const handleColorClick = (color: string) => {
    dispatch(toggleFilter(status, color));
  };

  /* 정렬 클릭 시, 해당 정렬 기준 적용 */
  const handleSortClick = (sort: string) => {
    dispatch(setSort(status, sort));
  };

  return (
    <Main>
      <Wrapper>
        <LeftWrapper>
          {status === TODO_STATUS.STARTED ? <Start /> : <Finish />}
          {status}
          <Sort>
            {Object.keys(SORT_LIST).map((item) => (
              <SortButton
                key={item}
                isActive={sortName === item}
                onClick={() => handleSortClick(item)}
              >
                {SORT_LIST[item]}
              </SortButton>
            ))}
          </Sort>
        </LeftWrapper>
        <ColorCounter>{renderColor(todoColorNums)}</ColorCounter>
      </Wrapper>
    </Main>
  );
};

export default TodoHeader;

const Main = styled.main`
  background-color: ${({ theme }) => theme.color.gray};
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  color: ${({ theme }) => theme.color.white};

  svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.color.white};
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  white-space: nowrap;
`;

const Sort = styled.div`
  display: flex;
  margin-left: 12px;
`;

const Button = styled.button<{ isActive: boolean }>`
  padding: 4px;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.white};
  font-size: 12px;
  white-space: nowrap;

  & + & {
    margin-left: 8px;
  }
`;

const SortButton = styled(Button)`
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.color.green : theme.color.gray};
  border: 1px solid ${({ theme }) => theme.color.lightGray};
`;

const ColorCounter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColorButton = styled(Button)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive ? theme.color.red : theme.color.lightGray};
`;

const Circle = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  margin-right: 4px;
  background-color: ${({ theme, color }) => theme.color[color]};
  border-radius: 50%;
`;
