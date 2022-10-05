import { AppRoute } from 'services/routes';
import DepartmentPage from 'department/view/Page';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect
} from 'react';
import {
  DepartmentQuery,
  initialDepartmentQuery
} from 'department/query';
import { departmentAction } from 'department/action';
import { useFormik } from 'formik';

function Element() {

  const dispatch = useDispatch();

  const { page } = useSelector((root: RootState) => root.department);
  const setFilter = useCallback((formikProps: DepartmentQuery) => dispatch(departmentAction.setFilter(formikProps)), [dispatch]);

  const formik = useFormik<DepartmentQuery>({
    initialValues: initialDepartmentQuery,
    onSubmit:      (values) => {
      setFilter(values);
    }
  });

  useEffect(() => {
    setFilter(initialDepartmentQuery);
  }, []);

  useEffect(() => {
    formik.setSubmitting(false);
  }, [page]);

  return (
    <DepartmentPage
      formik={formik}
      page={page}
    />
  );
}

const departmentPageRoute: AppRoute = {
  path:    '/admin/department-management',
  element: <Element />
};

export default departmentPageRoute;