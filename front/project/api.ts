import Page from 'type/Page';
import {
  ProjectId,
  ProjectShortVO,
  ProjectVO
} from 'project/domain';
import apiClient from 'services/api';
import {
  ProjectAddParameter,
  ProjectQuery,
  ProjectStatusParameter
} from 'project/parameter';
import { ProjectBasicFailReasonParameter } from 'project_basic/parameter';

class ProjectApi {
  async getPage(query: ProjectQuery): Promise<Page<ProjectShortVO>> {
    const { data } = await apiClient.get('/project/sales', query);
    return data;
  }

  async getOne(id: ProjectId): Promise<ProjectVO> {
    const { data } = await apiClient.get(`/project/sales/${id}`);
    return data;
  }

  async add(params: ProjectAddParameter): Promise<void> {
    const { data } = await apiClient.post('/project/sales', params);
    return data;
  }

  async updateStatus(id: ProjectId,
                     params: ProjectStatusParameter
  ): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/${id}/status`, params);
    return data;
  }

  async addFailReason(id: ProjectId,
                      params: ProjectBasicFailReasonParameter
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${id}/fail-reason`, params);
    return data;
  }

}

export const projectApi = new ProjectApi();
