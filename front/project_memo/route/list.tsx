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
import {
  ProjectMemoId,
  ProjectMemoVO
} from 'project_memo/domain';
import ProjectMemoList from 'project_memo/view/Drawer/List';
import { projectMemoAction } from 'project_memo/action';
import {
  initialProjectMemoQuery,
  ProjectMemoChangeParameter
} from 'project_memo/parameter';
import { ApiStatus } from 'components/DataFieldProps';
import { useFormik } from 'formik';

export default function ProjectMemoDrawerListRoute() {

  const dispatch = useDispatch();
  const { page, requestChange, requestDelete } = useSelector((root: RootState) => root.projectMemo);
  const { user } = useSelector((root: RootState) => root.login);
  const [list, setList] = useState<ProjectMemoVO[]>([]);

  const onChange = useCallback((params: ProjectMemoChangeParameter) => dispatch(projectMemoAction.change(params)), [dispatch]);
  const onDelete = useCallback((id: ProjectMemoId) => dispatch(projectMemoAction.deleteOne(id)), [dispatch]);

  const formik = useFormik<Partial<ProjectMemoChangeParameter>>({
    initialValues: {},
    onSubmit:      (values) => {
      onChange(values as ProjectMemoChangeParameter);
    }
  });

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
    if (requestChange === ApiStatus.RESPONSE) {
      formik.setSubmitting(false);
      formik.setValues({});
      dispatch(projectMemoAction.setFilter(initialProjectMemoQuery));
      dispatch(projectMemoAction.requestChange(ApiStatus.IDLE));
    }
  }, [requestChange]);
  useEffect(() => {
    if (requestDelete === ApiStatus.RESPONSE) {
      dispatch(projectMemoAction.setFilter(initialProjectMemoQuery));
      dispatch(projectMemoAction.requestDelete(ApiStatus.IDLE));
    }
  }, [requestDelete]);

  return (
    <ProjectMemoList
      login={user || undefined}
      list={list}
      formik={formik}
      onDelete={onDelete}
    />
  );
}