import React, {
  useCallback,
  useEffect
} from 'react';
import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import useId from 'services/useId';
import { RootState } from 'services/reducer';
import {
  initialPersonnelParameter,
  PersonnelParameter
} from 'personnel/parameter';
import { personnelAction } from 'personnel/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { PersonnelId, } from 'personnel/domain';
import PersonnelDetail from 'personnel/view/Detail';
import { departmentAction } from 'department/action';
import useDialog from 'dialog/hook';
import { closeStatus } from 'components/DataFieldProps';
import { addressModalAction } from 'components/AddressModal/action';
import { AddressModal } from 'components/AddressModal/AddressModal';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail, requestUpdate } = useSelector((root: RootState) => root.personnel);
  const { list: departmentList } = useSelector((root: RootState) => root.department);
  const { rollback } = useDialog();
  const openAddressModal = useCallback(() => dispatch(addressModalAction.addressModal(true)), [dispatch]);

  const update = useCallback((formikProps: PersonnelParameter) => {
    return dispatch(personnelAction.update(formikProps));
  }, [dispatch]);

  const formik = useFormik<PersonnelParameter>({
    initialValues: initialPersonnelParameter,
    onSubmit:      (values) => {
      update(values);
    }
  });

  useEffect(() => {
    dispatch(departmentAction.requestList());
    dispatch(personnelAction.setId(id ? PersonnelId(id) : undefined));
  }, [id]);

  useEffect(() => {
    if (detail) {
      formik.setValues({
        ...detail,
        jobList: detail.jobList.map(job => ({ ...job, departmentId: job.department?.id })),
        edit:    false,
      } as PersonnelParameter);
    }
    else {
      formik.setValues(initialPersonnelParameter);
    }
  }, [detail]);

  useEffect(() => {
    closeStatus(requestUpdate, () => {
      dispatch(personnelAction.setId(PersonnelId(id!)));
    }, () => {
      formik.setSubmitting(false);
      dispatch(personnelAction.requestUpdate('idle'));
    });
  }, [requestUpdate]);

  return (
    <FormikProvider value={formik}>
      <PersonnelDetail
        departmentList={departmentList}
        onAddressModal={openAddressModal}
        onCancel={() => {
          rollback(() => {
            formik.setValues({
              ...detail,
              edit: false,
            } as PersonnelParameter);
          });
        }}
      />
      <AddressModal fieldName='basic.address' formik={formik}/>
    </FormikProvider>
  );
}

const personnelDetailRoute: AppRoute = {
  path:    '/hr-card-management/:id',
  element: <Element />
};

export default personnelDetailRoute;
