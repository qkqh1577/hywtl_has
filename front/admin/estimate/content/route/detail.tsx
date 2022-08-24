import React, {
  useCallback,
  useEffect
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
import { useFormik } from 'formik';
import {
  FormikEditable,
  FormikSubmit
} from 'type/Form';
import {
  EstimateContentVO,
  initialEstimateContentVO
} from 'admin/estimate/content/domain';
import { EstimateContentParameter } from 'admin/estimate/content/parameter';
import {
  EstimateContentAction,
  estimateContentAction
} from 'admin/estimate/content/action';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.estimateContent);
  const { error } = useDialog();
  const upsert = useCallback(
    (formikProps: FormikSubmit<EstimateContentParameter>) =>
      dispatch(estimateContentAction.upsert(formikProps)),
    [dispatch]
  );

  const formik = useFormik<FormikEditable<EstimateContentVO>>({
    enableReinitialize: true,
    initialValues:      detail ? { edit: false, ...detail } : { edit: true, ...initialEstimateContentVO },
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
        type: EstimateContentAction.setOne,
        id,
      });
    }
  }, [dispatch]);

  return (
    <EstimateContentDetail
      formik={formik} />
  );
}

const estimateContentDetailRoute: AppRoute = {
  path:    '/admin/estimate/content-management/:id',
  element: <Element />
};

export default estimateContentDetailRoute;
