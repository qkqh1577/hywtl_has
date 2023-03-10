import { ProjectId } from 'project/domain';
import { ProjectScheduleQuery } from 'project_schedule/query';
import {
  ProjectScheduleId,
  ProjectScheduleShortVO,
  ProjectScheduleVO
} from 'project_schedule/domain';
import apiClient from 'services/api';
import { ProjectScheduleParameter } from 'project_schedule/parameter';

class ProjectScheduleApi {
  async getList(projectId: ProjectId,
                query: ProjectScheduleQuery
  ): Promise<ProjectScheduleShortVO[]> {
    const { data } = await apiClient.get(`/project/sales/${projectId}/schedule`, query);
    return data;
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

  async deleteOne(id: ProjectScheduleId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/schedule/${id}`);
    return data;
  }
}

export const projectScheduleApi = new ProjectScheduleApi();
