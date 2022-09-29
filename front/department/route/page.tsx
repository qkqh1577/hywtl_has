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
import { FormikSubmit } from 'type/Form';

function Element() {

  const dispatch = useDispatch();

  const { filter, page } = useSelector((root: RootState) => root.department);
  const setFilter = useCallback((formikProps: FormikSubmit<Partial<DepartmentQuery>>) => {
    const result: DepartmentQuery = {
      ...(filter ?? initialDepartmentQuery),
      ...(formikProps.values ?? initialDepartmentQuery),
    };
    dispatch(departmentAction.setFilter({
      ...formikProps,
      values: result,
    }));
  }, [dispatch]);

  const formik = useFormik<DepartmentQuery>({
    initialValues: filter ?? initialDepartmentQuery,
    onSubmit:      (values,
                    helper
                   ) => {
      setFilter({
        values: { ...values, page: 0 },
        ...helper
      });
    }
  });

  useEffect(() => {
    setFilter(formik);
  }, []);

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