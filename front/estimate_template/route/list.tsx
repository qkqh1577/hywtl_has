import React, {
  useCallback,
  useEffect
} from 'react';
import { AppRoute } from 'services/routes';
import EstimateTemplateList from 'estimate_template/view/List';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useFormik } from 'formik';
import {
  EstimateTemplateQuery,
  initialEstimateTemplateQuery
} from 'estimate_template/query';
import { estimateTemplateAction } from 'estimate_template/action';
import { FormikSubmit } from 'type/Form';

function Element() {

  const dispatch = useDispatch();
  const { list, filter } = useSelector((root: RootState) => root.estimateTemplate);
  const setFilter = useCallback((formikProps: FormikSubmit<Partial<EstimateTemplateQuery>>) => {
    const result: EstimateTemplateQuery = {
      ...(filter ?? initialEstimateTemplateQuery),
      ...formikProps.values,
    };
    dispatch(estimateTemplateAction.setFilter({
      ...formikProps,
      values: result
    }));
  }, [dispatch]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      filter ?? initialEstimateTemplateQuery,
    onSubmit:           (values,
                         helper
                        ) => {
      setFilter({
        values,
        ...helper
      });
    }
  });

  useEffect(() => {
    setFilter(formik);
  }, []);

  return (
    <EstimateTemplateList
      formik={formik}
      list={list}
    />
  );
}

const estimateTemplateListRoute: AppRoute = {
  path:    '/estimate/template',
  element: <Element />
};

export default estimateTemplateListRoute;