import React, {
  useCallback,
  useEffect,
} from 'react';
import { AppRoute } from 'services/routes';
import EstimateTemplateList from 'admin/estimate/template/view/List';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useFormik } from 'formik';
import {
  EstimateTemplateQuery,
  initialEstimateTemplateQuery
} from 'admin/estimate/template/query';
import { estimateTemplateAction } from 'admin/estimate/template/action';
import EstimateTemplateSeqModalRoute from 'admin/estimate/template/route/seqModal';

function Element() {

  const dispatch = useDispatch();
  const { list, seqModal } = useSelector((root: RootState) => root.estimateTemplate);
  const setFilter = useCallback((query: EstimateTemplateQuery) => dispatch(estimateTemplateAction.setFilter(query)), [dispatch]);

  const openSeqModal = useCallback(() => dispatch(estimateTemplateAction.seqModal(true)), [dispatch]);
  const formik = useFormik<EstimateTemplateQuery>({
    initialValues: initialEstimateTemplateQuery,
    onSubmit:      (values) => {
      setFilter(values);
    }
  });

  useEffect(() => {
    setFilter(initialEstimateTemplateQuery);
  }, [seqModal]);

  useEffect(() => {
    formik.setSubmitting(false);
  }, []);

  return (
    <EstimateTemplateList
      formik={formik}
      list={list}
      openSeqModal={openSeqModal}
      seqModal={<EstimateTemplateSeqModalRoute />}
    />
  );
}

const estimateTemplateListRoute: AppRoute = {
  path:    '/admin/estimate-template-management',
  element: <Element />
};

export default estimateTemplateListRoute;
