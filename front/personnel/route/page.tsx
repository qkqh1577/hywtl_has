import React, {
  useCallback,
  useEffect
} from 'react';
import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  initialPersonnelQuery,
  PersonnelQuery
} from 'personnel/query';
import { personnelAction } from 'personnel/action';
import { useFormik } from 'formik';
import PersonnelPage from 'personnel/view/Page';
import { departmentAction } from 'department/action';

function Element() {
  const dispatch = useDispatch();
  const { page } = useSelector((root: RootState) => root.personnel);

  const setFilter = useCallback((formikProps: PersonnelQuery) => dispatch(personnelAction.setFilter(formikProps)), [dispatch]);

  const formik = useFormik<PersonnelQuery>({
    initialValues: initialPersonnelQuery,
    onSubmit:      (values) => {
      setFilter(values);
    }
  });

  useEffect(() => {
    dispatch(departmentAction.requestList());
    setFilter(initialPersonnelQuery);
  }, []);

  return (
    <PersonnelPage
      page={page}
      formik={formik}
    />
  );
}

const personnelPageRoute: AppRoute = {
  path:    '/hr-card-management',
  element: <Element />
};

export default personnelPageRoute;
