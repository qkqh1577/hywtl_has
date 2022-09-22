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
import { FormikSubmit } from 'type/Form';
import {
  initialPersonnelQuery,
  PersonnelQuery
} from 'personnel/query';
import { personnelAction } from 'personnel/action';
import { useFormik } from 'formik';
import PersonnelPage from 'personnel/view/Page';

function Element() {
  const dispatch = useDispatch();
  const { filter, page } = useSelector((root: RootState) => root.personnel);
  const setFilter = useCallback((formikProps: FormikSubmit<PersonnelQuery>) => {
    const result: PersonnelQuery = {
      ...(filter ?? initialPersonnelQuery),
      ...(formikProps.values ?? initialPersonnelQuery)
    };
    dispatch(personnelAction.setFilter({
      ...formikProps,
      values: result,
    }));
  }, [dispatch]);

  const formik = useFormik<PersonnelQuery>({
    initialValues: filter ?? initialPersonnelQuery,
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
    <PersonnelPage
      page={page}
      formik={formik}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
}

const personnelPageRoute: AppRoute = {
  path:    '/user/hr-card-management',
  element: <Element />
};

export default personnelPageRoute;
