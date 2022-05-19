import dayjs from 'dayjs';

export const getDate = (date: Date | string | null | undefined): Date | undefined => {
  if (!date) {
    return undefined;
  }
  if(typeof date ==='string') {
    return dayjs(date).toDate();
  }
  return date;
};

export const maxDate = (a: Date | null | undefined, b: Date | null | undefined): Date | undefined => {
  const aDate = getDate(a);
  const bDate = getDate(b);
  if (typeof aDate === 'undefined' && typeof bDate === 'undefined') {
    return undefined;
  }
  if (typeof aDate === 'undefined') {
    return bDate;
  }
  if (typeof bDate === 'undefined') {
    return aDate;
  }
  return aDate.getTime() > bDate.getTime() ? aDate : bDate;
};

export const minDate = (a: Date | undefined, b: Date | undefined): Date | undefined => {
  const aDate = getDate(a);
  const bDate = getDate(b);
  if (typeof aDate === 'undefined' && typeof bDate === 'undefined') {
    return undefined;
  }
  if (typeof aDate === 'undefined') {
    return bDate;
  }
  if (typeof bDate === 'undefined') {
    return aDate;
  }
  return aDate.getTime() < bDate.getTime() ? aDate : bDate;
};

export type Domain = {
  createdAt: Date;
  modifiedAt?: Date;
}
export const findModifiedAt = <T extends Domain>(list: T[] | undefined): Date | undefined => {
  if (!Array.isArray(list) || list.length === 0) {
    return undefined;
  }
  const createdAt = list
  .map(item => item.createdAt)
  .reduce(maxDate, undefined);
  const modifiedAt = list
  .map(item => item.modifiedAt)
  .reduce(maxDate, undefined);
  return maxDate(createdAt, modifiedAt);
};