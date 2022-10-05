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
import useDialog from 'components/Dialog';
import { ApiStatus } from 'components/DataFieldProps';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail, requestUpdate } = useSelector((root: RootState) => root.personnel);
  const { list: departmentList } = useSelector((root: RootState) => root.department);
  const { rollback, error, alert } = useDialog();

  const update = useCallback((formikProps: PersonnelParameter) => {
    return dispatch(personnelAction.update(formikProps));
  }, [dispatch]);

  const formik = useFormik<PersonnelParameter>({
    initialValues: initialPersonnelParameter,
    onSubmit:      (values) => {
      update(values);
      // update({
      //   id:           PersonnelId(id!),
      //   basic:        toPersonnelBasic(values.basic),
      //   company:      toPersonnelCompany(values.company),
      //   jobList:      values.jobList.map((item) => toPersonnelJob(item)),
      //   academicList: values.academicList?.map((item) => toPersonnelAcademy(item)),
      //   careerList:   values.careerList?.map((item) => toPersonnelCareer(item)),
      //   licenseList:  values.licenseList?.map((item) => toPersonnelLicense(item)),
      //   languageList: values.languageList?.map((item) => toPersonnelLanguage(item)),
      // });
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
    if (requestUpdate === ApiStatus.DONE) {
      alert('저장하였습니다.');
      formik.setSubmitting(false);
      dispatch(personnelAction.setId(PersonnelId(id!)));
      dispatch(personnelAction.requestUpdate(ApiStatus.IDLE));
    }
    else if (requestUpdate === ApiStatus.FAIL) {
      error('저장에 실패하였습니다.');
      dispatch(personnelAction.requestUpdate(ApiStatus.IDLE));
      formik.setSubmitting(false);
    }
  }, [requestUpdate]);

  return (
    <FormikProvider value={formik}>
      <PersonnelDetail
        departmentList={departmentList}
        onCancel={() => {
          rollback(() => {
            formik.setValues({
              ...detail,
              edit: false,
            } as PersonnelParameter);
          });
        }}
      />
    </FormikProvider>
  );
}

const personnelDetailRoute: AppRoute = {
  path:    '/hr-card-management/:id',
  element: <Element />
};

export default personnelDetailRoute;
