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
import EstimateTemplateDetail from 'estimate_template/view/Detail';
import { useFormik } from 'formik';
import useId from 'services/useId';
import {
  EstimateTemplateVO,
  initialEstimateTemplateVO
} from 'estimate_template/domain';
import useDialog from 'components/Dialog';
import { estimateTemplateAction } from 'estimate_template/action';
import { EstimateTemplateParameter } from 'estimate_template/parameter';
import {
  FormikEditable,
  FormikSubmit
} from 'type/Form';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.estimateTemplate);
  const { error } = useDialog();
  const upsert = useCallback(
    (formikProps: FormikSubmit<EstimateTemplateParameter>) =>
      dispatch(estimateTemplateAction.upsert(formikProps)),
    [dispatch]
  );

  const formik = useFormik<FormikEditable<EstimateTemplateVO>>({
    enableReinitialize: true,
    initialValues:      detail ? { edit: false, ...detail } : { edit: true, ...initialEstimateTemplateVO },
    onSubmit:           (values,
                         helper
                        ) => {
      if (!values.edit) {
        error('수정 상태가 아닙니다.');
        return;
      }
      upsert({ values, ...helper });
    }
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'estimate/template/id/set',
        id,
      });
    }
  }, [id]);

  return (
    <EstimateTemplateDetail
      formik={formik}
    />
  );
}

const estimateTemplateDetailRoute: AppRoute = {
  path:    '/estimate-template-management/:id',
  element: <Element />
};

export default estimateTemplateDetailRoute;