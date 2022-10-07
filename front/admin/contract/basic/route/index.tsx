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
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  ContractBasicParameter,
  initialContractBasicParameter,
} from 'admin/contract/basic/parameter';
import { ContractBasicVO } from 'admin/contract/basic/domain';
import useDialog from 'components/Dialog';
import { ApiStatus } from 'components/DataFieldProps';

function Element() {
  const dispatch = useDispatch();
  const { alert, error, rollback } = useDialog();
  const { template, requestUpsert } = useSelector((root: RootState) => root.contractBasic);
  const upsert = useCallback((formikProps: ContractBasicParameter) =>
    dispatch(contractBasicAction.upsert(formikProps)), [dispatch]);

  const formik = useFormik<ContractBasicVO>({
      initialValues: template,
      onSubmit:      (values) => {
        upsert(values);
      }
    }
  );

  useEffect(() => {
    dispatch(contractBasicAction.requestOne());
  }, []);

  useEffect(() => {
    formik.setValues(template ? { ...template } : initialContractBasicParameter);
  }, [template]);

  useEffect(() => {
    if (requestUpsert === ApiStatus.DONE) {
      alert('저장하였습니다.');
      formik.setSubmitting(false);
      dispatch(contractBasicAction.requestOne());
      dispatch(contractBasicAction.requestUpsert(ApiStatus.IDLE));
    }
    else if (requestUpsert === ApiStatus.FAIL) {
      error('저장에 실패하였습니다.');
      formik.setSubmitting(false);
      dispatch(contractBasicAction.requestUpsert(ApiStatus.IDLE));
    }
  }, [requestUpsert]);

  return (
    <FormikProvider value={formik}>
      <ContractBasicTemplate onCancel={() => {
        rollback(() => {
          formik.setValues(template ? { ...template } : initialContractBasicParameter);
        });
      }} />
    </FormikProvider>
  );
}

const contractBasicTemplateRoute: AppRoute = {
  path:    '/admin/contract-basic-management',
  element: <Element />
};
export default contractBasicTemplateRoute;
