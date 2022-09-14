import Page from 'type/Page';
import { ProjectLogVO } from 'project_log/domain';
import { ProjectLogQuery } from 'project_log/query';
import { ProjectId } from 'project/domain';
import apiClient from 'services/api';
import dayjs from 'dayjs';

class ProjectLogApi {
  async getPage(projectId: ProjectId, query: ProjectLogQuery
  ): Promise<Page<ProjectLogVO>> {
    console.log("projectId inside of API : ", projectId);
    const { data } = await apiClient.get(`/project/sales/${projectId}/log`, {
      ...query,
      createdAt: query.createdAt ? dayjs(query.createdAt)
                  .format('YYYY-MM-DD') : undefined,
    });
    return data;
  }
}

export const projectLogApi = new ProjectLogApi();
