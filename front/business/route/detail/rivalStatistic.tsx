import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';
import dayjs from 'dayjs';
import BusinessRivalStatisticTable from 'business/view/Detail/Form/RivalStatisticSection';
import { FormikContext } from 'formik';

export default function BusinessRivalStatisticRoute() {


  const { id, rivalProjectList } = useSelector((root: RootState) => root.business);
  const count = rivalProjectList?.length || 0;
  const minYear = rivalProjectList && rivalProjectList.length > 0
    ? rivalProjectList.map((item) =>
      dayjs(item.bidBeginDate)
      .year())
                      .reduce((a,
                               b
                      ) => a > b ? b : a) : undefined;

  const maxYear = rivalProjectList && rivalProjectList.length > 0
    ? rivalProjectList.map((item) =>
      dayjs(item.bidBeginDate)
      .year())
                      .reduce((a,
                               b
                      ) => a < b ? b : a) : undefined;

  const winCount = rivalProjectList && rivalProjectList.length > 0
    ? rivalProjectList.map((item) => item.win)
                      .filter(win => win.id === 1)
      .length : undefined;

  const drawCount = rivalProjectList && rivalProjectList.length > 0
    ? rivalProjectList.map(item => item.win)
                      .filter(win => win.id !== 1 && win.id !== id)
      .length : undefined;

  const loseCount = rivalProjectList && rivalProjectList.length > 0
    ? rivalProjectList.map(item => item.win)
                      .filter(win => win.id !== 1)
      .length : undefined;

  const formik = useContext(FormikContext);
  if (formik.values.edit) {
    return null;
  }

  return (
    <BusinessRivalStatisticTable
      count={count}
      minYear={minYear}
      maxYear={maxYear}
      winCount={winCount}
      drawCount={drawCount}
      loseCount={loseCount}
    />
  );
}