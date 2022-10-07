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
import useDialog from 'components/Dialog';

export default function ProjectMemoDrawerListRoute() {
  const { error, alert } = useDialog();
  const dispatch = useDispatch();
  const { page, requestChange, requestDelete } = useSelector((root: RootState) => root.projectMemo);
  const { detail: loginUser } = useSelector((root: RootState) => root.login);
  const [list, setList] = useState<ProjectMemoVO[]>([]);

  const onChange = useCallback((params: ProjectMemoChangeParameter) => dispatch(projectMemoAction.change(params)), [dispatch]);
  const onDelete = useCallback((id: ProjectMemoId) => dispatch(projectMemoAction.deleteOne(id)), [dispatch]);

  const formik = useFormik<ProjectMemoChangeParameter>({
    initialValues: {} as ProjectMemoChangeParameter,
    onSubmit:      (values) => {
      onChange(values);
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
    if (requestChange === ApiStatus.DONE) {
      alert('변경하였습니다.');
      formik.setSubmitting(false);
      formik.setValues({} as ProjectMemoChangeParameter);
      dispatch(projectMemoAction.setFilter(initialProjectMemoQuery));
      dispatch(projectMemoAction.requestChange(ApiStatus.IDLE));
      formik.setSubmitting(false);
    }
    else if (requestChange === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      formik.setSubmitting(false);
      dispatch(projectMemoAction.requestChange(ApiStatus.IDLE));
    }
  }, [requestChange]);

  useEffect(() => {
    if (requestDelete === ApiStatus.DONE) {
      alert('삭제하였습니다.');
      dispatch(projectMemoAction.setFilter(initialProjectMemoQuery));
      dispatch(projectMemoAction.requestDelete(ApiStatus.IDLE));
    }
    else if (requestDelete === ApiStatus.FAIL) {
      error('삭제에 실패하였습니다.');
      dispatch(projectMemoAction.requestDelete(ApiStatus.IDLE));
    }
  }, [requestDelete]);

  return (
    <ProjectMemoList
      login={loginUser}
      list={list}
      onDelete={onDelete}
      formik={formik}
    />
  );
}