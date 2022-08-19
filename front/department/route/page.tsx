import { AppRoute } from 'services/routes';
import DepartmentPage from 'department/view/Page';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  useCallback,
  useEffect
} from 'react';
import {
  DepartmentQuery,
  initialDepartmentQuery
} from 'department/query';
import { departmentAction } from 'department/action';
import { useFormik } from 'formik';
import React from 'react';
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
  const onPageChange = (event,
                        page
  ) => {
    setFilter({ ...formik, values: { page } });
  };

  const onRowsPerPageChange = (event) => {
    const size = +(event.target.value) || 10;
    setFilter({ ...formik, values: { size, page: 0 } });
  };

  useEffect(() => {
    setFilter(formik);
  }, []);

  return (
    <DepartmentPage
      formik={formik}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
}

const departmentPageRoute: AppRoute = {
  path:    '/department-management',
  element: <Element />
};

export default departmentPageRoute;