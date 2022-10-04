import apiClient from 'services/api';
import { ProjectStatusParameter } from 'project_status/parameter';
import {
  ProjectId,
  ProjectVO
} from 'project/domain';
import { ProjectStatus } from 'project_status/domain';
import { ProjectBasicFailReasonParameter } from 'project_basic/parameter';

class ProjectStatusApi {
  async getOne(id: ProjectId): Promise<ProjectStatus> {
    const { data: { progressStatus, estimateExpectation, estimateStatus, contractStatus } } = await apiClient.get(`/project/sales/${id}`) as { data: ProjectVO };
    return {
      progressStatus,
      estimateExpectation,
      estimateStatus,
      contractStatus
    };
  }

  async update(id: ProjectId, params: ProjectStatusParameter): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/${id}/status`, params);
    return data;
  }

  async addFailReason(id: ProjectId, params: ProjectBasicFailReasonParameter): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${id}/basic/fail-reason`, params);
    return data;
  }
}

export const projectStatusApi = new ProjectStatusApi();
