import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectBidSection from 'project_bid/view';
import useId from 'services/useId';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectBidAction } from 'project_bid/action';
import { ProjectId } from 'project/domain';
import { ProjectBidParameter } from 'project_bid/parameter';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectBidVO } from 'project_bid/domain';

export default function ProjectBidRoute() {

  const dispatch = useDispatch();
  const id = useId();
  const { projectId, detail } = useSelector((root: RootState) => root.projectBid);
  const update = useCallback((params: ProjectBidParameter) => dispatch(projectBidAction.update(params)), [dispatch]);

  useEffect(() => {
    if (id && id !== projectId) {
      dispatch(projectBidAction.setProjectId(ProjectId(id)));
    }
  }, [id]);

  const formik = useFormik<ProjectBidVO>({
    enableReinitialize: true,
    initialValues:      detail ?? {},
    onSubmit:           (values) => {
      update({
        ...values,
        winId: values.win?.id || undefined,
      });
    }
  });

  return (
    <FormikProvider value={formik}>
      <ProjectBidSection
        onChange={() => {
          formik.handleSubmit();
        }}
      />
    </FormikProvider>
  );
}