import Page from 'type/Page';
import { ProjectLogVO } from 'project_log/domain';
import { ProjectLogQuery } from 'project_log/query';
import { ProjectId } from 'project/domain';
import apiClient from 'services/api';

class ProjectLogApi {
  async getPage(projectId: ProjectId,
                query: ProjectLogQuery
  ): Promise<Page<ProjectLogVO>> {
    const { data } = await apiClient.get(`/project/sales/${projectId}/log`, query);
    return data;
  }
}

export const projectLogApi = new ProjectLogApi();
