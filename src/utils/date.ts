import { TIME_ZONE } from 'utils/constants';

/* TIME_ZONE, options에 따른 Date 문자열 반환 함수 */
const getDate = (date: Date, options: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleString(TIME_ZONE, options);
};

export default getDate;
