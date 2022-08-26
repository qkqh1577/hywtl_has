import { useSelector } from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useEffect,
  useState
} from 'react';
import { ProjectMemoVO } from 'project_memo/domain';
import ProjectMemoList from 'project_memo/view/Drawer/List';

export default function ProjectMemoDrawerListRoute() {

  const { page } = useSelector((root: RootState) => root.projectMemo);
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

  return (
    <ProjectMemoList list={list} />
  );
}