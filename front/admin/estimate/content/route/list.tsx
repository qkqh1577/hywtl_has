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
  EstimateContentQuery,
  initialEstimateContentQuery
} from 'admin/estimate/content/query';
import { estimateContentAction } from 'admin/estimate/content/action';
import { useFormik } from 'formik';
import EstimateContentList from 'admin/estimate/content/view/List';

function Element() {
  const dispatch = useDispatch();
  const { list } = useSelector((root: RootState) => root.estimateContent);
  const setFilter = useCallback((query: EstimateContentQuery) => dispatch(estimateContentAction.setFilter(query)), [dispatch]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      initialEstimateContentQuery,
    onSubmit:           (values) => {
      setFilter(values);
    }
  });

  useEffect(() => {
    setFilter(initialEstimateContentQuery);
  }, []);

  return (
    <EstimateContentList
      formik={formik}
      list={list}
    />
  );
}

const estimateContentListRoute: AppRoute = {
  path:    '/admin/estimate-content-management',
  element: <Element />
};

export default estimateContentListRoute;
