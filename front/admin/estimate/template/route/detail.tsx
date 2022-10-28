import { AppRoute } from 'services/routes';
import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import EstimateTemplateDetail from 'admin/estimate/template/view/Detail';
import {
  FormikProvider,
  useFormik
} from 'formik';
import useId from 'services/useId';
import { estimateTemplateAction } from 'admin/estimate/template/action';
import {
  EstimateTemplateParameter,
  initialEstimateTemplateParameter
} from 'admin/estimate/template/parameter';
import { EstimateTemplateId } from 'admin/estimate/template/domain';
import { useNavigate } from 'react-router-dom';
import { closeStatus } from 'components/DataFieldProps';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail, requestUpsert, requestDelete } = useSelector((root: RootState) => root.estimateTemplate);
  const upsert = useCallback((params: EstimateTemplateParameter) => dispatch(estimateTemplateAction.upsert(params)), [dispatch]);
  const onDelete = useCallback(() => dispatch(estimateTemplateAction.deleteOne()), [dispatch]);
  const formik = useFormik<EstimateTemplateParameter>({
    enableReinitialize: true,
    initialValues:      initialEstimateTemplateParameter,
    onSubmit:           (values) => {
      upsert(values);
    }
  });

  useEffect(() => {
    dispatch(estimateTemplateAction.setId(id ? EstimateTemplateId(id) : undefined));
  }, [id]);

  useEffect(() => {
    if (detail) {
      formik.setValues({ ...detail, edit: false } as EstimateTemplateParameter);
    }
    else {
      formik.setValues(initialEstimateTemplateParameter);
    }
  }, [detail]);

  useEffect(() => {
    closeStatus(requestUpsert, () => {
      dispatch(estimateTemplateAction.setId(id ? EstimateTemplateId(id) : undefined));
    }, () => {
      formik.setSubmitting(false);
      dispatch(estimateTemplateAction.requestUpsert('idle'));
    });
  }, [requestUpsert]);

  useEffect(() => {
    closeStatus(requestDelete, () => {
      navigate('/admin/estimate-template-management');

    }, () => {
      dispatch(estimateTemplateAction.requestDelete('idle'));
      formik.setSubmitting(false);
    });
  }, [requestDelete]);

  return (
    <FormikProvider value={formik}>
      <EstimateTemplateDetail
        onCancel={() => {
          if (detail) {
            formik.setValues({ ...detail, edit: false } as EstimateTemplateParameter);
          }
          else {
            formik.setValues(initialEstimateTemplateParameter);
          }
        }}
        onDelete={onDelete} />
    </FormikProvider>
  );
}

const estimateTemplateDetailRoute: AppRoute = {
  path:    '/admin/estimate-template-management/:id',
  element: <Element />
};

export default estimateTemplateDetailRoute;