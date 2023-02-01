import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import useId from 'services/useId';
import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  BusinessParameter,
  initialBusinessParameter
} from 'business/parameter';
import { businessAction } from 'business/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  BusinessId,
  BusinessManagerId
} from 'business/domain';
import BusinessDetail from 'business/view/Detail';
import BusinessInvolvedProjectRoute from 'business/route/detail/involvedProject';
import BusinessRivalStatisticRoute from 'business/route/detail/rivalStatistic';
import BusinessRivalProjectListRoute from 'business/route/detail/rivalProject';
import useDialog from 'dialog/hook';
import { useNavigate } from 'react-router-dom';
import BusinessBasicRoute from 'business/route/detail/basic';
import { DialogStatus } from 'dialog/domain';
import { closeStatus } from 'components/DataFieldProps';
import {
  AddressModal,
  UpdateByFormik
} from 'components/AddressModal/AddressModal';
import { addressModalAction } from 'components/AddressModal/action';
import ProjectListModal from 'business/view/Detail/Modal/ProjectListModal';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, confirm, rollback } = useDialog();
  const { detail, requestDelete, requestUpsert, checkRegistrationNumber, projectList, open } = useSelector((root: RootState) => root.business);
  const upsert = useCallback((formikProps: BusinessParameter) => {
    dispatch(businessAction.upsert(formikProps));
  }, [dispatch]);
  const deleteOne = useCallback((id: BusinessId) => dispatch(businessAction.deleteOne(id)), [dispatch]);
  const openAddressModal = useCallback(() => dispatch(addressModalAction.addressModal(true)), [dispatch]);
  const openProjectListModal = useCallback((businessManagerId: BusinessManagerId) => dispatch(businessAction.setProjectListModal(businessManagerId)), [dispatch]);
  const closeProjectListModal = useCallback(() => dispatch(businessAction.setProjectListModal(undefined)), [dispatch]);
  const [address, setAddress] = useState<UpdateByFormik>({} as UpdateByFormik);
  const formik = useFormik<BusinessParameter>({
    initialValues: initialBusinessParameter,
    onSubmit:      (values) => {
      upsert(values);
    }
  });

  useEffect(() => {
    dispatch(businessAction.setId(id ? BusinessId(id) : undefined));
  }, [id]);

  useEffect(() => {
    if (detail) {
      formik.setValues({
        ...detail,
        edit: false,
      } as BusinessParameter);
    }
    else {
      formik.setValues(initialBusinessParameter);
    }
  }, [detail]);

  useEffect(() => {
    closeStatus(requestUpsert, () => {
      if (id) {
        dispatch(businessAction.setId(BusinessId(id)));
      }
      else {
        navigate('/business-management');
      }
    }, () => {
      dispatch(businessAction.requestUpsert('idle'));
      formik.setSubmitting(false);
    });
  }, [requestUpsert]);

  useEffect(() => {
    closeStatus(requestDelete, () => {
      dispatch(businessAction.setId(undefined));
      navigate('/business-management');
    }, () => {
      dispatch(businessAction.requestDelete('idle'));
    });
  }, [requestDelete]);

  return (
    <FormikProvider value={formik}>
      <BusinessDetail
        basic={<BusinessBasicRoute
          setAddress={setAddress}
          onAddressModal={openAddressModal}
          checkRegistrationNumber={checkRegistrationNumber}
        />}
        involvedProjectList={<BusinessInvolvedProjectRoute />}
        rivalStatistic={<BusinessRivalStatisticRoute />}
        rivalProjectList={<BusinessRivalProjectListRoute />}
        openProjectListModal={openProjectListModal}
        onAddressModal={openAddressModal}
        setAddress={setAddress}
        onCancel={() => {
          rollback(() => {
            formik.setValues({
              ...detail,
              edit: false,
            } as BusinessParameter);
          });
        }}
        onDelete={() => {
          if (id) {
            confirm({
              status:       DialogStatus.WARN,
              children:     '해당 업체 정보를 삭제하시겠습니까?',
              confirmText:  '삭제',
              afterConfirm: () => {
                deleteOne(BusinessId(id));
              }
            });
          }
          else {
            error('업체가 선택되지 않았습니다.');
          }
        }}
      />
      {address && (
        <AddressModal updateByFormik={address} />
      )}
      {open && (
        <ProjectListModal
          open={open}
          onClose={closeProjectListModal}
          projectList={projectList}
        />
      )}
    </FormikProvider>
  );
}

const businessDetailRoute: AppRoute = {
  path:    '/business-management/:id',
  element: <Element />,
};

export default businessDetailRoute;
