import React, {
  useCallback,
  useMemo,
} from 'react';
import ProjectSchedule from 'project_schedule/view';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectScheduleAction } from 'project_schedule/action';
import { ProjectScheduleQuery } from 'project_schedule/query';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectScheduleId } from 'project_schedule/domain';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';

export type OnAddModalOpen = (open: boolean) => void
export type OnDetailModalOpen = (id: ProjectScheduleId) => void;

export default function ProjectScheduleRoute() {
  const id = useId();
  const dispatch = useDispatch();
  const { list, filter, projectId } = useSelector((root: RootState) => root.projectSchedule);

  const setFilter = useCallback((filter: ProjectScheduleQuery) => dispatch(projectScheduleAction.setFilter(filter)), [dispatch]);

  const formik = useFormik<ProjectScheduleQuery>({
    enableReinitialize: true,
    initialValues:      {},
    onSubmit:           (values,
                         helper
                        ) => {
      const { keyword } = values;
      if (keyword) {
        setKeyword(keyword);
      }
      helper.setSubmitting(false);
    }
  });

  const isSearchForm = useMemo(() => !!filter?.keyword, [filter]);

  const setDate = (startDate: string,
                   endDate: string
  ) => {
    setFilter({
      projectId: projectId ?? ProjectId(id!),
      startDate,
      endDate
    });
  };

  const setKeyword = (keyword: string) => {
    setFilter({
      projectId: projectId ?? ProjectId(id!),
      keyword,
    });
  };

  const onAddModalOpen: OnAddModalOpen = useCallback(() =>
    dispatch(projectScheduleAction.addModal(true)), [dispatch]);

  const onDetailModalOpen: OnDetailModalOpen = useCallback((id) =>
    dispatch(projectScheduleAction.setId(id)), [dispatch]);

  return (
    <FormikProvider value={formik}>
      <ProjectSchedule
        list={list}
        onAddModalOpen={onAddModalOpen}
        onDetailModalOpen={onDetailModalOpen}
        isSearchForm={isSearchForm}
        setDate={setDate}
        setKeyword={setKeyword}
      />
    </FormikProvider>
  );
}
