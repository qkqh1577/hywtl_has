import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import { FormikSubmit } from 'type/Form';
import {
  initialProjectMemoQuery,
  ProjectMemoQuery
} from 'project_memo/parameter';
import { projectMemoAction } from 'project_memo/action';
import { useFormik } from 'formik';
import { ProjectMemoVO } from 'project_memo/domain';
import ProjectMemoDrawer from 'project_memo/view/Drawer';

export default function ProjectMemoDrawerRoute() {

  const { projectId, page } = useSelector((root: RootState) => root.projectMemo);
  const dispatch = useDispatch();
  const setFilter = useCallback((formikProps: FormikSubmit<ProjectMemoQuery>) =>
      dispatch(projectMemoAction.setFilter(formikProps))
    , [dispatch]);

  const formik = useFormik<ProjectMemoQuery>({
    initialValues: initialProjectMemoQuery,
    onSubmit:      (values,
                    helper
                   ) => {
      setFilter({
        values,
        ...helper
      });
    }
  });

  const [list, setList] = useState<ProjectMemoVO[]>([]);

  useEffect(() => {
    if (!page) {
      setList([]);
      return;
    }
    if (page.number > 0) {
      setList([...list, ...page.content]);
    }
    else {
      setList(page.content);
    }
  }, [page]);


  useEffect(() => {
    if (projectId) {
      dispatch(projectMemoAction.setFilter(formik));
    }
  }, [projectId]);

  if (typeof projectId === 'undefined') {
    return null;
  }
  return (
    <ProjectMemoDrawer
      formik={formik}
      list={list}
    />
  );
}