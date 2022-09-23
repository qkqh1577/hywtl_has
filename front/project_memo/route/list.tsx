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
import { initialProjectMemoQuery } from 'project_memo/parameter';

export default function ProjectMemoDrawerListRoute() {

  const dispatch = useDispatch();
  const { page, requestDelete } = useSelector((root: RootState) => root.projectMemo);
  const [list, setList] = useState<ProjectMemoVO[]>([]);

  const onDelete = useCallback((id: ProjectMemoId) => dispatch(projectMemoAction.deleteOne(id)), [dispatch]);

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
    if (requestDelete === 'response') {
      dispatch(projectMemoAction.setFilter(initialProjectMemoQuery));
      dispatch(projectMemoAction.requestDelete('idle'));
    }
  }, [requestDelete]);

  return (
    <ProjectMemoList list={list} onDelete={onDelete} />
  );
}