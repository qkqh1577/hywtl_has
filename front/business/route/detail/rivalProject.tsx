import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import BusinessRivalProjectListSection from 'business/view/Detail/Form/RivalProjectInformationList';
import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';

export default function BusinessRivalProjectListRoute() {

  const { rivalProjectList } = useSelector((root: RootState) => root.business);
  const formik = useContext(FormikContext);

  if (formik.values.edit) {
    return null;
  }

  return (
    <BusinessRivalProjectListSection
      list={rivalProjectList}
    />
  );
}