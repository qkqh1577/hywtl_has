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
import {
  BusinessQuery,
  initialBusinessQuery
} from 'business/query';
import { businessAction } from 'business/action';
import { useFormik } from 'formik';
import BusinessPage from 'business/view/Page';

function Element() {
  const dispatch = useDispatch();
  const { filter, page } = useSelector((root: RootState) => root.business);
  const setFilter = useCallback((query?: BusinessQuery) => dispatch(businessAction.setFilter(query ?? initialBusinessQuery)), [dispatch]);

  const formik = useFormik<BusinessQuery>({
    initialValues: filter ?? initialBusinessQuery,
    onSubmit:      (values
                   ) => {
      setFilter(values);
    }
  });

  useEffect(() => {
    setFilter();
  }, []);

  useEffect(() => {
    formik.setSubmitting(false);
  }, [page]);

  return (
    <BusinessPage
      page={page}
      formik={formik}
    />
  );
}

const businessPageRoute: AppRoute = {
  path:    '/business-management',
  element: <Element />,
};

export default businessPageRoute;
