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
import useDialog from 'dialog/hook';
import { closeStatus } from 'components/DataFieldProps';

function Element() {
  const dispatch = useDispatch();
  const { rollback } = useDialog();
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
    closeStatus(requestUpsert, () => {
      dispatch(contractConditionAction.requestOne());
    }, () => {
      formik.setSubmitting(false);
      dispatch(contractConditionAction.requestUpsert('idle'));
    });
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

const contractConditionTemplateRoute: AppRoute = {
  path:    '/admin/contract-condition-management',
  element: <Element />
};
export default contractConditionTemplateRoute;
