import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { projectMemoAction } from 'project_memo/action';
import ProjectMemoDrawer from 'project_memo/view/Drawer';
import ProjectMemoDrawerFilterRoute from 'project_memo/route/filter';
import ProjectMemoDrawerFormRoute from 'project_memo/route/form';
import ProjectMemoDrawerListRoute from 'project_memo/route/list';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';
import { ProjectId } from 'project/domain';
import { ProjectMemoAddParameter } from 'project_memo/parameter';
import useDialog from 'dialog/hook';

export default function ProjectMemoDrawerRoute() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector((root: RootState) => root.project);
  const { projectId, open } = useSelector((root: RootState) => root.projectMemo);
  const setOpen = useCallback((open: boolean) => dispatch(projectMemoAction.setDrawer(open)), [dispatch]);
  const isProjectPage = pathname.startsWith('/project/sales-management/');
  const [projectMemo, setProjectMemo] = useState<ProjectMemoAddParameter>();
  const { confirm } = useDialog();

  useEffect(() => {
    dispatch(projectMemoAction.setProjectId(ProjectId(id!)));
  }, [id]);

  useEffect(() => {
    dispatch(projectMemoAction.setDrawer(typeof projectId !== 'undefined'));
  }, [projectId]);
  // TODO: 페이지 이탈 막는 로직
  // usePrompt('페이지 이동 또는 새로고침 시, 작성완료 되지 않은 메모는 초기화됩니다. 페이지를 이동하시겠습니까?', !isProjectPage);
  // useEffect(() => {
  //   if (projectMemo?.description || projectMemo?.attendanceList) {
  //     confirm({
  //       children:     '페이지 이동 또는 새로고침 시, 작성완료 되지 않은 메모는 초기화됩니다. 페이지를 이동하시겠습니까?',
  //       afterConfirm: () => {
  //         navigate(-1);
  //       },
  //       confirmText:  '확인',
  //     });
  //   }
  // }, [isProjectPage]);

  if (!isProjectPage || !projectId) {
    return null;
  }

  return (
    <ProjectMemoDrawer
      open={!!projectId && open}
      setOpen={setOpen}
      list={<ProjectMemoDrawerListRoute />}
      form={<ProjectMemoDrawerFormRoute
        setProjectMemo={setProjectMemo}
      />}
      filter={<ProjectMemoDrawerFilterRoute />}
    />
  );
}
