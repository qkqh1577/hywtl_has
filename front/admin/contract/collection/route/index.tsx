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
import { FormikSubmit } from 'type/Form';
import {
  ContractCollectionParameter,
  initialContractCollectionParameter
} from 'admin/contract/collection/parameter';
import { contractCollectionAction } from 'admin/contract/collection/action';
import { useFormik } from 'formik';
import { ContractCollectionVO, } from 'admin/contract/collection/domain';
import TotalRatioCellRoute from './totalRatioCell';

function Element() {
  const dispatch = useDispatch();
  const { template } = useSelector((root: RootState) => root.contractCollection);
  const upsert = useCallback((formikProps: FormikSubmit<ContractCollectionParameter>) =>
    dispatch(contractCollectionAction.upsert(formikProps)), [dispatch]);

  const formik = useFormik<ContractCollectionVO>({
    enableReinitialize: true,
    initialValues:      template ? template : initialContractCollectionParameter,
    onSubmit:           (values,
                         helper
                        ) => {
      upsert({
        values,
        ...helper
      });
    }
  });

  useEffect(() => {
    dispatch(contractCollectionAction.setOne(template));
  }, []);

  return (
    <ContractCollectionTemplate
      formik={formik}
      totalRatioCell={<TotalRatioCellRoute />}
    />
  );
}

const contractCollectionTemplateRoute: AppRoute = {
  path:    '/admin/contract-collection-management',
  element: <Element />
};

export default contractCollectionTemplateRoute;
