import React, {
  useCallback,
  useEffect,
} from 'react';
import { AppRoute } from 'services/routes';
import ContractBasicTemplate from 'admin/contract/basic/view/Template';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  contractBasicAction,
} from 'admin/contract/basic/action';
import { useFormik } from 'formik';
import {
  ContractBasicParameter,
  initialContractBasicParameter
} from 'admin/contract/basic/parameter';
import { ContractBasicVO } from 'admin/contract/basic/domain';
import { FormikSubmit } from 'type/Form';

function Element() {
  const dispatch = useDispatch();
  const { template } = useSelector((root: RootState) => root.contractBasic);
  const upsert = useCallback((formikProps: FormikSubmit<ContractBasicParameter>) =>
    dispatch(contractBasicAction.upsert(formikProps)), [dispatch]);

  const formik = useFormik<ContractBasicVO>({
      enableReinitialize: true,
      initialValues:      template ? template : initialContractBasicParameter,
      onSubmit:           (values,
                           helper
                          ) => {
        upsert({
          values,
          ...helper
        });
      }
    }
  );

  useEffect(() => {
    dispatch(contractBasicAction.setOne(template));
  }, []);

  return (
    <ContractBasicTemplate
      formik={formik}
    />
  );
}

const contractBasicTemplateRoute: AppRoute = {
  path:    '/admin/contract/basic-management',
  element: <Element />
};
export default contractBasicTemplateRoute;
