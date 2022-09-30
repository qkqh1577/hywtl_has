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
import useDialog from 'components/Dialog';
import { estimateTemplateAction } from 'admin/estimate/template/action';
import {
  EstimateTemplateParameter,
  initialEstimateTemplateParameter
} from 'admin/estimate/template/parameter';
import { FormikEditable } from 'type/Form';
import { EstimateTemplateId } from 'admin/estimate/template/domain';
import { useNavigate } from 'react-router-dom';
import { ApiStatus } from 'components/DataFieldProps';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail, requestUpsert, requestDelete } = useSelector((root: RootState) => root.estimateTemplate);
  const { error, alert } = useDialog();
  const upsert = useCallback((params: EstimateTemplateParameter) => dispatch(estimateTemplateAction.upsert(params)), [dispatch]);

  const onDelete = useCallback(() => dispatch(estimateTemplateAction.deleteOne()), [dispatch]);
  const formik = useFormik<EstimateTemplateParameter>({
    enableReinitialize: true,
    initialValues:      initialEstimateTemplateParameter,
    onSubmit:           (formikValues) => {
      const values = formikValues as FormikEditable<EstimateTemplateParameter>;
      if (id && !values.edit) {
        error('수정 상태가 아닙니다.');
        return;
      }
      upsert(values);
      formik.setSubmitting(false);
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(estimateTemplateAction.setId(EstimateTemplateId(id)));
    }
    else {
      dispatch(estimateTemplateAction.setId(undefined));
    }
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
    if (requestUpsert === ApiStatus.DONE) {
      alert('저장하였습니다', () => {
        if (id) {
          dispatch(estimateTemplateAction.setId(EstimateTemplateId(id)));
        }
        else {
          navigate('/admin/estimate-template-management');
        }
      });
      dispatch(estimateTemplateAction.requestUpsert(ApiStatus.IDLE));
    }
    else if (requestUpsert === ApiStatus.FAIL) {
      error('저장에 실패하였습니다.');
      dispatch(estimateTemplateAction.requestUpsert(ApiStatus.IDLE));
    }
  }, [requestUpsert]);

  useEffect(() => {
    if (requestDelete === ApiStatus.DONE) {
      alert('삭제하였습니다.');
      dispatch(estimateTemplateAction.requestDelete(ApiStatus.IDLE));
      navigate('/admin/estimate-template-management');
    }
    else if (requestDelete === ApiStatus.FAIL) {
      error('삭제에 실패하였습니다.');
      dispatch(estimateTemplateAction.requestDelete(ApiStatus.IDLE));
    }
  }, [requestDelete]);

  return (
    <FormikProvider value={formik}>
      <EstimateTemplateDetail onDelete={onDelete} />
    </FormikProvider>
  );
}

const estimateTemplateDetailRoute: AppRoute = {
  path:    '/admin/estimate-template-management/:id',
  element: <Element />
};

export default estimateTemplateDetailRoute;