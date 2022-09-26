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
  FormikEditable,
  FormikSubmit
} from 'type/Form';
import { PersonnelParameter } from 'personnel/parameter';
import {
  PersonnelAction,
  personnelAction
} from 'personnel/action';
import { useFormik } from 'formik';
import {
  initialPersonnelVO,
  PersonnelId,
  PersonnelVO
} from 'personnel/domain';
import {
  toPersonnelAcademy,
  toPersonnelBasic,
  toPersonnelCareer,
  toPersonnelCompany,
  toPersonnelJob,
  toPersonnelLanguage,
  toPersonnelLicense
} from 'personnel/util/convertVoToParameter';
import PersonnelDetail from 'personnel/view/Detail';
import { toOption } from 'personnel/util/convertToOption';

export interface PersonnelVOInputValue
  extends FormikEditable<PersonnelVO> {
  representativeJob?: number;
}

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const {
          account,
          basic,
          company,
          jobList,
          academicList,
          careerList,
          licenseList,
          languageList,
          detail
        } = useSelector((root: RootState) => root.personnel);

  const personnelVO: PersonnelVOInputValue = {
    name:              detail?.name || '',
    userStatus:        detail?.userStatus || '',
    email:             detail?.email || '',
    basic:             detail?.basic,
    company:           detail?.company,
    jobList:           detail?.jobList || [],
    academicList:      detail?.academicList || [],
    careerList:        detail?.careerList || [],
    licenseList:       detail?.licenseList || [],
    languageList:      detail?.languageList || [],
    edit:              false,
    representativeJob: detail?.jobList?.filter((job) => job.isRepresentative)[0] ?
                         detail?.jobList?.filter((job) => job.isRepresentative)[0].department!.id
                         : undefined,
  };
  const { list } = useSelector((root: RootState) => root.department);

  const update = useCallback((formikProps: FormikSubmit<PersonnelParameter>) => {
    return dispatch(personnelAction.update(formikProps));
  }, [dispatch]);

  const formik = useFormik<PersonnelVOInputValue>({
    enableReinitialize: true,
    initialValues:      personnelVO || initialPersonnelVO,
    onSubmit:           (values,
                         helpers
                        ) => {
      update({
        values: {
          id:           PersonnelId(id!),
          basic:        toPersonnelBasic(values.basic!),
          company:      toPersonnelCompany(values.company!),
          jobList:      values.jobList.map((item) => toPersonnelJob(item, values.representativeJob!)),
          academicList: values.academicList.map((item) => toPersonnelAcademy(item)),
          careerList:   values.careerList.map((item) => toPersonnelCareer(item)),
          licenseList:  values.licenseList.map((item) => toPersonnelLicense(item)),
          languageList: values.languageList.map((item) => toPersonnelLanguage(item)),
        }, ...helpers
      });
    }
  });
  const edit = formik.values.edit;
  useEffect(() => {
    console.log('id : ', id);
    console.log('detail.id : ', detail?.id);
    if (detail?.id !== id) {
      dispatch({
        type: 'department/list/request'
      });
      dispatch({
        type: PersonnelAction.setId,
        id
      });
    }
  }, [id]);
  return (
    <PersonnelDetail
      formik={formik}
      edit={edit}
      list={toOption(list || [])}
    />
  );
}

const personnelDetailRoute: AppRoute = {
  path:    '/user/hr-card-management/:id',
  element: <Element />
};

export default personnelDetailRoute;
