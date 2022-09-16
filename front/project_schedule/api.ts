import { ProjectId } from 'project/domain';
import { ProjectScheduleQuery } from 'project_schedule/query';
import {
  ProjectScheduleId,
  ProjectScheduleShort,
  ProjectScheduleVO
} from 'project_schedule/domain';
import apiClient from 'services/api';
import { ProjectScheduleParameter } from 'project_schedule/parameter';

const testData: ProjectScheduleShort[] = [
  {
    id:        ProjectScheduleId(1),
    startTime: new Date(2022, 9, 1, 10, 30),
    endTime:   new Date(2022, 9, 6, 10, 30),
    allDay:    false,
    title:     '사업설명회참석',
    type:      '일정',
  },
  {
    id:        ProjectScheduleId(2),
    startTime: new Date(2022, 9, 1, 10, 30),
    endTime:   new Date('September 29, 2022 03:24:00'),
    allDay:    false,
    title:     '한양풍동전사미팅',
    type:      '일정',
  },
  {
    id:        ProjectScheduleId(3),
    startTime: new Date('September 30, 2022 03:24:00'),
    endTime:   new Date('October 3, 2022 03:24:00'),
    allDay:    false,
    title:     '기획 미팅',
    type:      '일정',
  },
  {
    id:        ProjectScheduleId(4),
    startTime: new Date('September 1, 2022 03:24:00'),
    endTime:   new Date('September 5, 2022 03:24:00'),
    allDay:    false,
    title:     '호우캐스팅미팅',
    type:      '일정',
  },
  {
    id:        ProjectScheduleId(5),
    startTime: new Date('September 9, 2022 03:24:00'),
    endTime:   new Date('September 10, 2022 03:24:00'),
    allDay:    false,
    title:     '투자유치설명회',
    type:      '일정',
  }
];

class ProjectScheduleApi {
  async getList(projectId: ProjectId,
                query: ProjectScheduleQuery
  ): Promise<ProjectScheduleShort[]> {
    // const { data } = await apiClient.get(`/project/sales/${projectId}/schedule`, query);
    // return data;
    return testData;
  }

  async getOne(id: ProjectScheduleId): Promise<ProjectScheduleVO> {
    const { data } = await apiClient.get(`/project/sales/schedule/${id}`);
    return data;
  }


  async add(projectId: ProjectId,
            params: ProjectScheduleParameter
  ): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/${projectId}/schedule`, params);
    return data;
  }

  async update(params: ProjectScheduleParameter): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/schedule/${params.id}`, params);
    return data;
  }

  async delete(id: ProjectScheduleId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/schedule/${id}`);
    return data;
  }
}

export const projectScheduleApi = new ProjectScheduleApi();
