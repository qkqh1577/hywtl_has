import { ProjectId } from 'project/domain';
import {
  ProjectCollectionStageId,
  ProjectCollectionStageVO,
  ProjectCollectionVO
} from 'project_collection/domain';
import apiClient from 'services/api';
import {
  ProjectCollectionAddStageParameter,
  ProjectCollectionChangeStageParameter
} from 'project_collection/parameter';
import { UserId } from 'user/domain';

class ProjectCollectionApi {
  async getOne(projectId: ProjectId): Promise<ProjectCollectionVO> {
    const { data } = await apiClient.get(`/project/sales/${projectId}/collection`);
    return data;
  }

  async getStage(id: ProjectCollectionStageId): Promise<ProjectCollectionStageVO> {
    const { data } = await apiClient.get(`/project/sales/collection/stage/${id}`);
    return data;
  }

  async updateManager(projectId: ProjectId,
                      userId: UserId | undefined
  ): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/${projectId}/collection/manager`, { userId });
    return data;
  }

  async changeStageSeq(projectId: ProjectId,
                       idList: ProjectCollectionStageId[]
  ): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${projectId}/collection/stage/seq`, { idList });
    return data;
  }

  async addStage(projectId: ProjectId,
                 params: ProjectCollectionAddStageParameter
  ): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/${projectId}/collection/stage`, params);
    return data;
  }

  async changeStage(params: ProjectCollectionChangeStageParameter): Promise<void> {
    const { data } = await apiClient.put(`/project/sales/collection/stage/${params.id}`, params);
    return data;
  }

  async deleteStage(id: ProjectCollectionStageId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/collection/stage/${id}`);
    return data;
  }
}

export const projectCollectionApi = new ProjectCollectionApi();