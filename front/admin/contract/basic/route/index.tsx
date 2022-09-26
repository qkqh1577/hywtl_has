import React, {
  useCallback,
  useEffect,
} from 'react';
import { AppRoute } from 'services/routes';
import ContractBasicTemplate from 'admin/contract/basic/view';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { contractBasicAction, } from 'admin/contract/basic/action';
import { useFormik } from 'formik';
import { ContractBasicParameter, } from 'admin/contract/basic/parameter';
import { ContractBasicVO } from 'admin/contract/basic/domain';

function Element() {
  const dispatch = useDispatch();
  const { template } = useSelector((root: RootState) => root.contractBasic);
  const upsert = useCallback((formikProps: ContractBasicParameter) =>
    dispatch(contractBasicAction.upsert(formikProps)), [dispatch]);

  const formik = useFormik<ContractBasicVO>({
      enableReinitialize: true,
      initialValues:      template,
      onSubmit:           (values) => {
        upsert(values);
        formik.setSubmitting(false);
      }
    }
  );

  useEffect(() => {
    dispatch(contractBasicAction.getOne());
  }, []);

  return (
    <ContractBasicTemplate
      formik={formik}
    />
  );
}

const contractBasicTemplateRoute: AppRoute = {
  path:    '/admin/contract-basic-management',
  element: <Element />
};
export default contractBasicTemplateRoute;
