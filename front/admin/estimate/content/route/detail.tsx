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
import useDialog from 'components/Dialog';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { FormikEditable, } from 'type/Form';
import {
  EstimateContentParameter,
  initialEstimateContentParameter
} from 'admin/estimate/content/parameter';
import { estimateContentAction } from 'admin/estimate/content/action';
import { EstimateContentId } from 'admin/estimate/content/domain';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail, variableList } = useSelector((root: RootState) => root.estimateContent);
  const { error } = useDialog();
  const upsert = useCallback((params: EstimateContentParameter) => dispatch(estimateContentAction.upsert(params)), [dispatch]);
  const onDelete = useCallback(() => dispatch(estimateContentAction.deleteOne()), [dispatch]);
  const formik = useFormik<EstimateContentParameter>({
    enableReinitialize: true,
    initialValues:      initialEstimateContentParameter,
    onSubmit:           (formikValues) => {
      const values = formikValues as FormikEditable<EstimateContentParameter>;
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
      dispatch(estimateContentAction.setId(EstimateContentId(id)));
    }
    else {
      dispatch(estimateContentAction.setId(undefined));
    }
    dispatch(estimateContentAction.requestVariableList());
  }, [id]);

  useEffect(() => {
    if (detail) {
      formik.setValues({ ...detail, edit: false } as EstimateContentParameter);
    }
    else {
      formik.setValues(initialEstimateContentParameter);
    }
  }, [detail]);

  return (
    <FormikProvider value={formik}>
      <EstimateContentDetail
        variableList={variableList}
        onDelete={onDelete}
        onCancel={() => {
          if (detail) {
            formik.setValues({ ...detail, edit: false } as EstimateContentParameter);
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
