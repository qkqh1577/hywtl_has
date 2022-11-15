import React, {
  useCallback,
  useEffect,
} from 'react';
import { AppRoute } from 'services/routes';
import useId from 'services/useId';
import EstimateContentDetail from 'admin/estimate/content/view/Detail';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  EstimateContentParameter,
  initialEstimateContentParameter
} from 'admin/estimate/content/parameter';
import { estimateContentAction } from 'admin/estimate/content/action';
import { EstimateContentId } from 'admin/estimate/content/domain';
import { closeStatus } from 'components/DataFieldProps';
import { useNavigate } from 'react-router-dom';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail, variableList, requestUpsert, requestDelete } = useSelector((root: RootState) => root.estimateContent);
  const upsert = useCallback((params: EstimateContentParameter) => dispatch(estimateContentAction.upsert(params)), [dispatch]);
  const onDelete = useCallback(() => dispatch(estimateContentAction.deleteOne()), [dispatch]);
  const formik = useFormik<EstimateContentParameter>({
    initialValues: initialEstimateContentParameter,
    onSubmit:      (values) => {
      upsert(values);
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(estimateContentAction.setId(EstimateContentId(id)));
    }
    else {
      dispatch(estimateContentAction.setId(undefined));
    }
    dispatch(estimateContentAction.requestVariableList());
  }, [id]);

  useEffect(() => {
    if (detail) {
      formik.setValues({
        ...detail,
        testTypeList: detail.testTypeList ?? initialEstimateContentParameter.testTypeList,
        edit:         false
      } as EstimateContentParameter);
    }
    else {
      formik.setValues(initialEstimateContentParameter);
    }
  }, [detail]);

  useEffect(() => {
    closeStatus(requestUpsert, () => {
      if (detail) {
        dispatch(estimateContentAction.setId(EstimateContentId(detail.id)));
      }
      else {
        navigate('/admin/estimate-content-management');
      }
    }, () => {
      formik.setSubmitting(false);
      dispatch(estimateContentAction.requestUpsert('idle'));
    });
  }, [requestUpsert]);

  useEffect(() => {
    closeStatus(requestDelete, () => {
      navigate('/admin/estimate-content-management');
    }, () => {
      dispatch(estimateContentAction.requestDelete('idle'));
    });
  }, [requestDelete]);

  return (
    <FormikProvider value={formik}>
      <EstimateContentDetail
        variableList={variableList}
        onDelete={onDelete}
        onCancel={() => {
          if (detail) {
            formik.setValues({
              ...detail,
              testTypeList: detail.testTypeList ?? initialEstimateContentParameter.testTypeList,
              edit:         false
            } as EstimateContentParameter);
          }
          else {
            formik.setValues(initialEstimateContentParameter);
          }
        }}
      />
    </FormikProvider>
  );
}

const estimateContentDetailRoute: AppRoute = {
  path:    '/admin/estimate-content-management/:id',
  element: <Element />
};

export default estimateContentDetailRoute;
