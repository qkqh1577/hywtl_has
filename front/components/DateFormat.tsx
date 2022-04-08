import React from 'react';
import dayjs from 'dayjs';

const DateFormat = (props: { date?: Date, format?: string }) => {
  const { date, format } = props;
  if (!date) {
    return <>-</>;
  }
  return <>{dayjs(date).format(format ?? 'YYYY-MM-DD')}</>;
};

export default DateFormat;
