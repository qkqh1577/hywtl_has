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
import { ContractConditionParameter, } from 'admin/contract/condition/parameter';
import { useFormik } from 'formik';
import {
  ContractConditionListVO,
  initialContractConditionListVO
} from 'admin/contract/condition/domain';
import { contractConditionAction } from 'admin/contract/condition/action';

function Element() {
  const dispatch = useDispatch();
  const { template, variableList } = useSelector((root: RootState) => root.contractCondition);
  const upsert = useCallback((formikProps: ContractConditionParameter) =>
    dispatch(contractConditionAction.upsert(formikProps)), [dispatch]);

  const formik = useFormik<ContractConditionListVO>({
    enableReinitialize: true,
    initialValues:      template ? template : initialContractConditionListVO,
    onSubmit:           (values) => {
      upsert(values);
    }
  });

  useEffect(() => {
    dispatch(contractConditionAction.getOne());
    dispatch(contractConditionAction.getVariableList());
  }, []);

  return (
    <ContractConditionTemplate
      formik={formik}
      variableList={variableList}
    />
  );
}

export const contractConditionTemplateRoute: AppRoute = {
  path:    '/admin/contract-condition-management',
  element: <Element />
};
