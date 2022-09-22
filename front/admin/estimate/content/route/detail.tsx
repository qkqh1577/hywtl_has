import React, {
  useCallback,
  useContext,
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
  FormikContext,
  FormikContextType,
  useFormik
} from 'formik';
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
import EstimateContentRemoveButton from 'admin/estimate/content/view/Detail/Footer/RemoveButton';
import { EstimateContentId } from 'admin/estimate/content/domain';
import AddDescription from 'admin/estimate/content/view/Detail/DetailList/Footer';

interface WithDescription
  extends FormikPartial<EstimateContentParameter> {
  newDescription: string;
}

function DetailListFooterRoute() {

  const { error } = useDialog();
  const formik: FormikContextType<WithDescription> = useContext(FormikContext);

  return (
    <AddDescription
      onClick={() => {
        const { values } = formik;
        const { newDescription, detailList } = values;
        if (!newDescription) {
          error('추가할 내용이 없습니다.');
          return;
        }
        formik.setFieldValue('detailList', [...(detailList || []), newDescription]);
        formik.setFieldValue('newDescription', '');
      }}
    />
  );
}

function RemoveButtonRoute() {

  const id = useId();
  const dispatch = useDispatch();
  const remove = useCallback((id: EstimateContentId) => dispatch(estimateContentAction.delete(id)), [dispatch]);

  return (
    <EstimateContentRemoveButton
      onClick={() => {
        if (id) {
          remove(EstimateContentId(id));
        }
      }}
    />
  );
}


function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail, variableList } = useSelector((root: RootState) => root.estimateContent);
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
    dispatch({
      type: EstimateContentAction.setVariableList
    });
  }, [id]);
  return (
    <EstimateContentDetail
      formik={formik}
      detailListFooter={<DetailListFooterRoute />}
      removeButton={<RemoveButtonRoute />}
      variableList={variableList}
    />
  );
}

const estimateContentDetailRoute: AppRoute = {
  path:    '/admin/estimate-content-management/:id',
  element: <Element />
};

export default estimateContentDetailRoute;
