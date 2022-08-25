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
import { useFormik } from 'formik';
import {
  FormikEditable,
  FormikPartial,
  FormikSubmit,
  toValues
} from 'type/Form';
import {
  EstimateContentParameter,
  initialEstimateContentParameter
} from 'admin/estimate/content/parameter';
import {
  EstimateContentAction,
  estimateContentAction
} from 'admin/estimate/content/action';

interface WithDescription
  extends FormikPartial<EstimateContentParameter> {
  newDescription: string;
}

function isWithDescription(values: FormikPartial<EstimateContentParameter>): values is WithDescription {
  return typeof (values as any).newDescription === 'string';
}

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.estimateContent);
  const { error } = useDialog();
  const upsert = useCallback((formikProps: FormikSubmit<FormikPartial<EstimateContentParameter>>) =>
      dispatch(estimateContentAction.upsert({
        ...formikProps,
        values: toValues(formikProps.values) as EstimateContentParameter,
      })),
    [dispatch]
  );

  const formik = useFormik<FormikEditable<FormikPartial<EstimateContentParameter>>>({
    enableReinitialize: true,
    initialValues:      detail ? { edit: false, ...detail } : { edit: true, ...initialEstimateContentParameter },
    onSubmit:           (values,
                         helper
                        ) => {
      if (!values.edit) {
        error('수정 상태가 아닙니다.');
        helper.setSubmitting(false);
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
  }, [id]);

  return (
    <EstimateContentDetail
      formik={formik}
      onClick={() => {
        const { values } = formik;
        if (isWithDescription(values)) {
          const { newDescription, detailList } = values;
          if (!newDescription) {
            error('추가할 내용이 없습니다.');
            return;
          }
          formik.setFieldValue('detailList', [...(detailList || []), newDescription]);
          formik.setFieldValue('newDescription', '');
        }
      }}
    />
  );
}

const estimateContentDetailRoute: AppRoute = {
  path:    '/admin/estimate/content-management/:id',
  element: <Element />
};

export default estimateContentDetailRoute;
