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
import { useFormik } from 'formik';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectMemoDrawerListRoute() {
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
    closeStatus(requestChange, () => {
      formik.setValues({} as ProjectMemoChangeParameter);
      dispatch(projectMemoAction.setFilter(initialProjectMemoQuery));
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectMemoAction.requestChange('idle'));
    });
  }, [requestChange]);

  useEffect(() => {
    closeStatus(requestDelete, () => {
      dispatch(projectMemoAction.setFilter(initialProjectMemoQuery));
    }, () => {
      dispatch(projectMemoAction.requestDelete('idle'));
    });
  }, [requestDelete]);

  return (
    <ProjectMemoList
      login={loginUser}
      list={list}
      onDelete={onDelete}
      formik={formik}
      onChange={onChange}
    />
  );
}
