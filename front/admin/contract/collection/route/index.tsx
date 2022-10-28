import React, {
  useCallback,
  useEffect
} from 'react';
import { AppRoute } from 'services/routes';
import ContractCollectionTemplate from 'admin/contract/collection/view';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  ContractCollectionParameter,
  initialContractCollectionParameter
} from 'admin/contract/collection/parameter';
import { contractCollectionAction } from 'admin/contract/collection/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ContractCollectionVO } from 'admin/contract/collection/domain';
import { closeStatus } from 'components/DataFieldProps';
import useDialog from 'dialog/hook';

function Element() {
  const dispatch = useDispatch();
  const { rollback } = useDialog();
  const { template, requestUpsert } = useSelector((root: RootState) => root.contractCollection);
  const upsert = useCallback((formikProps: ContractCollectionParameter) =>
    dispatch(contractCollectionAction.upsert(formikProps)), [dispatch]);

  const formik = useFormik<ContractCollectionVO>({
    initialValues: initialContractCollectionParameter,
    onSubmit:      (values) => {
      upsert(values);
    }
  });

  useEffect(() => {
    dispatch(contractCollectionAction.requestOne());
  }, []);

  useEffect(() => {
    formik.setValues(template ? { ...template } : initialContractCollectionParameter);
  }, [template]);

  useEffect(() => {
    closeStatus(requestUpsert, () => {
      dispatch(contractCollectionAction.requestOne());
    }, () => {
      formik.setSubmitting(false);
      dispatch(contractCollectionAction.requestUpsert('idle'));
    });
  }, [requestUpsert]);

  return (
    <FormikProvider value={formik}>
      <ContractCollectionTemplate
        onCancel={() => {
          rollback(() => {
            formik.setValues(template ? { ...template } : initialContractCollectionParameter);
          });
        }}
      />
    </FormikProvider>
  );
}

const contractCollectionTemplateRoute: AppRoute = {
  path:    '/admin/contract-collection-management',
  element: <Element />
};

export default contractCollectionTemplateRoute;
