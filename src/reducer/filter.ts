export const TOGGLE_FILTER = 'filter/TOGGLE_FILTER' as const;

export const toggleFilter = (status: string, color: string) => ({
  type: TOGGLE_FILTER,
  payload: { status, color },
});

export type FilterType = {
  START: string[];
  FINISH: string[];
};

type FilterState = {
  filter: FilterType;
};
type FilterAction = ReturnType<typeof toggleFilter>;

const initialState: FilterState = {
  filter: {
    START: [],
    FINISH: [],
  },
};

function filter(
  state: FilterState = initialState,
  action: FilterAction,
): FilterState {
  switch (action.type) {
    case TOGGLE_FILTER:
      const filterType = action.payload.status as keyof FilterType;
      const index = state.filter[filterType].findIndex(
        (filter) => filter === action.payload.color,
      );
      const newFilter =
        index === -1
          ? state.filter[filterType].concat(action.payload.color)
          : state.filter[filterType].filter((_, idx) => idx !== index);

      return { ...state, filter: { ...state.filter, [filterType]: newFilter } };

    default:
      return state;
  }
}

export default filter;
