import React from 'react';
import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  useCallback,
  useEffect
} from 'react';
import { FormikSubmit } from 'type/Form';
import {
  EstimateContentQuery,
  initialEstimateContentQuery
} from 'admin/estimate/content/query';
import { estimateContentAction } from 'admin/estimate/content/action';
import { useFormik } from 'formik';
import EstimateContentList from 'admin/estimate/content/view/List';

function Element() {
  console.log('hi in list page');
  const dispatch = useDispatch();
  const { list, filter } = useSelector((root: RootState) => root.estimateContent);
  const setFilter = useCallback((formikProps: FormikSubmit<Partial<EstimateContentQuery>>) => {
    const result: EstimateContentQuery = {
      ...(filter ?? initialEstimateContentQuery),
      ...formikProps.values,
    };
    dispatch(estimateContentAction.setFilter({
      ...formikProps,
      values: result,

    }));
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: filter ?? initialEstimateContentQuery,
    onSubmit: (values, helper) => {
      setFilter({
        values,
        ...helper
      });
    }
  });

  useEffect(() => {
    setFilter(formik);
  }, []);

  return(
    <EstimateContentList  formik={formik} list={list}/>
  )

}

const estimateContentListRoute: AppRoute = {
  path: '/admin/estimate/content-management',
  element: <Element />
}

export default estimateContentListRoute;
