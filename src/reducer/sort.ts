export const SET_SORT = 'sort/SET_SORT' as const;

export const setSort = (status: string, sort: string) => ({
  type: SET_SORT,
  payload: { status, sort },
});

export type SortType = {
  START: string;
  FINISH: string;
};

type SortState = {
  sort: SortType;
};
type SortAction = ReturnType<typeof setSort>;

const initialState: SortState = {
  sort: {
    START: 'create',
    FINISH: 'create',
  },
};

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
