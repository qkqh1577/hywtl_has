import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect
} from 'react';
import { FormikSubmit } from 'user/action';
import {
  BusinessQuery,
  initialBusinessQuery
} from '../query';
import { businessAction } from 'business/action';
import { useFormik } from 'formik';
import BusinessPage from 'business/view/Page';

function Element() {
  const dispatch = useDispatch();
  const { filter, page } = useSelector((root: RootState) => root.business);
  const setFilter = useCallback((formikProps: FormikSubmit<Partial<BusinessQuery>>) => {
    const result: BusinessQuery = {
      ...(filter ?? initialBusinessQuery),
      ...(formikProps.values ?? initialBusinessQuery),
    };
    dispatch(businessAction.setFilter({
      ...formikProps,
      values: result,
    }));
  }, [dispatch]);

  const formik = useFormik<BusinessQuery>({
    initialValues: filter ?? initialBusinessQuery,
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
    <BusinessPage
      page={page}
      formik={formik}
      onPageChange={onPageChange}
      onRowsPerPageChange = {onRowsPerPageChange}
    />
  );
}

const businessPageRoute: AppRoute = {
  path:    '/business-management',
  element: <Element />,
};

export default businessPageRoute;
