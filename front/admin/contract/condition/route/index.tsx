import React, {
  useCallback,
  useEffect
} from 'react';
import { AppRoute } from 'services/routes';
import ContractConditionTemplate from 'admin/contract/condition/view';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  ContractConditionListParameter,
  initialContractConditionListParameter,
  initialContractConditionParameter,
} from 'admin/contract/condition/parameter';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { contractConditionAction } from 'admin/contract/condition/action';
import useDialog from 'components/Dialog';
import { ApiStatus } from 'components/DataFieldProps';

function Element() {
  const dispatch = useDispatch();
  const { alert, error, rollback } = useDialog();
  const { template, variableList, requestUpsert } = useSelector((root: RootState) => root.contractCondition);
  const upsert = useCallback((formikProps: ContractConditionListParameter) =>
    dispatch(contractConditionAction.upsert(formikProps)), [dispatch]);

  const formik = useFormik<ContractConditionListParameter>({
    initialValues: initialContractConditionListParameter,
    onSubmit:      (values) => {
      upsert(values);
    }
  });

  useEffect(() => {
    dispatch(contractConditionAction.requestOne());
    dispatch(contractConditionAction.requestVariableList());
  }, []);

  useEffect(() => {
    formik.setValues(template
      ? {
        contractConditionList: (!template.contractConditionList || template.contractConditionList.length === 0)
                                 ? [initialContractConditionParameter]
                                 : template.contractConditionList
      } as ContractConditionListParameter
      : initialContractConditionListParameter);
  }, [template]);

  useEffect(() => {
    if (requestUpsert === ApiStatus.DONE) {
      alert('저장하였습니다.');
      formik.setSubmitting(false);
      dispatch(contractConditionAction.requestOne());
      dispatch(contractConditionAction.requestUpsert(ApiStatus.IDLE));
    }
    else if (requestUpsert === ApiStatus.FAIL) {
      error('저장에 실패하였습니다.');
      formik.setSubmitting(false);
      dispatch(contractConditionAction.requestUpsert(ApiStatus.IDLE));
    }
  }, [requestUpsert]);

  return (
    <FormikProvider value={formik}>
      <ContractConditionTemplate
        variableList={variableList}
        onCancel={() => {
          rollback(() => {
            formik.setValues(template ? { ...template } : initialContractConditionListParameter);
          });
        }}
      />
    </FormikProvider>
  );
}

export const contractConditionTemplateRoute: AppRoute = {
  path:    '/admin/contract-condition-management',
  element: <Element />
};
