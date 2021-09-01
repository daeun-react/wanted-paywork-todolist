/* Ducks 패턴으로 filter 구현 */
import { FilterType } from 'types/todo';

/* Action */
export const TOGGLE_FILTER = 'filter/TOGGLE_FILTER' as const;

/* Action Creator */
export const toggleFilter = (status: string, color: string) => ({
  type: TOGGLE_FILTER,
  payload: { status, color },
});

/* Type */
type FilterState = {
  filter: FilterType;
};
type FilterAction = ReturnType<typeof toggleFilter>;

/* Initial */
const initialState: FilterState = {
  filter: {
    START: [],
    FINISH: [],
  },
};

/* filter Reducer */
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
