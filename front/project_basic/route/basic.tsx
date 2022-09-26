import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  FormikPartial,
  toPartial
} from 'type/Form';
import {
  initialProjectVO,
  ProjectVO
} from 'project/domain';
import React, { useEffect } from 'react';
import ProjectBasicBasicSection from 'project_basic/view/BasicSection';
import { projectBasicActionType } from 'project_basic/action';

export default function ProjectBasicBasicRoute() {
  const dispatch = useDispatch();
  const { basic } = useSelector((root: RootState) => root.projectBasic);

  const formik = useFormik<FormikPartial<ProjectVO>>({
    enableReinitialize: true,
    initialValues:      toPartial(basic, initialProjectVO),
    onSubmit:           (values) => {
      console.log(values);
    }
  });

  useEffect(() => {
    if (!basic?.bidType) {
      return;
    }
    dispatch(projectBasicActionType.setBidType(basic.bidType));
  }, [basic]);

  return (
    <FormikProvider value={formik}>
      <ProjectBasicBasicSection handleChangeBidType={(e) => {
        if (!e) {
          return;
        }
        dispatch(projectBasicActionType.setBidType(e.target.value));
      }} />
    </FormikProvider>
  );
}
