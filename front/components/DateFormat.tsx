import React from 'react';
import dayjs from 'dayjs';

type Props = {
  date?: Date;
  format?: string;
  prefix?: string;
  postfix?: string;
}
const DateFormat = ({
  date,
  format,
  prefix,
  postfix,
}: Props) => {
  if (!date) {
    return <>-</>;
  }
  return <>
    {prefix}
    {dayjs(date).format(format ?? 'YYYY-MM-DD')}
    {postfix}
  </>;
};

export default DateFormat;
