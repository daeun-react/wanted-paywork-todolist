/* Ducks 패턴으로 sort 구현 */
import { SortType } from 'types/todo';

/* Action */
export const SET_SORT = 'sort/SET_SORT' as const;

/* Action Creator */
export const setSort = (status: string, sort: string) => ({
  type: SET_SORT,
  payload: { status, sort },
});

/* Type */
type SortState = {
  sort: SortType;
};
type SortAction = ReturnType<typeof setSort>;

/* Initial */
const initialState: SortState = {
  sort: {
    START: 'create',
    FINISH: 'create',
  },
};

/* sort Reducer */
function sort(state: SortState = initialState, action: SortAction): SortState {
  switch (action.type) {
    case SET_SORT:
      const status = action.payload.status as keyof SortType;
      return {
        ...state,
        sort: { ...state.sort, [status]: action.payload.sort },
      };

    default:
      return state;
  }
}

export default sort;
