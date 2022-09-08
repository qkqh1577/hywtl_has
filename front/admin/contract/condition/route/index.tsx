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
import { FormikSubmit } from 'type/Form';
import {
  ContractConditionParameter,
} from 'admin/contract/condition/parameter';
import { useFormik } from 'formik';
import {
  ContractConditionVO,
  initialContractConditionVO
} from 'admin/contract/condition/domain';
import { contractConditionAction } from 'admin/contract/condition/action';

function Element() {
  const dispatch = useDispatch();
  const { template } = useSelector((root: RootState) => root.contractCondition);
  const upsert = useCallback((formikProps: FormikSubmit<ContractConditionParameter>) =>
    dispatch(contractConditionAction.upsert(formikProps)), [dispatch]);

  const formik = useFormik<ContractConditionVO>({
    enableReinitialize: true,
    initialValues:      template ? template : initialContractConditionVO,
    onSubmit:           (values,
                         helper
                        ) => {
      upsert({
        values,
        ...helper
      });
      console.log('submit');
    }
  });

  useEffect(() => {
    dispatch(contractConditionAction.setOne(template));
  }, []);
  return (
    <ContractConditionTemplate
     formik={formik}/>
  );
}

export const contractConditionTemplateRoute: AppRoute = {
  path:    '/admin/contract/condition-management',
  element: <Element />
};
