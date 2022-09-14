import { ProjectId } from 'project/domain';
import {
  RivalEstimateId,
  RivalEstimateVO
} from 'rival_estimate/domain';
import apiClient from 'services/api';
import { RivalEstimateParameter } from 'rival_estimate/parameter';

class RivalEstimateApi {
  async getList(id: ProjectId): Promise<RivalEstimateVO[]> {
    const { data } = await apiClient.get(`/project/sales/${id}/rival-estimate`);
    return data;
  }

  async push(id: ProjectId): Promise<void> {
    const { data } = await apiClient.post(`/project/sales/${id}/rival-estimate`);
    return data;
  }

  async update(id: RivalEstimateId,
               params: RivalEstimateParameter
  ): Promise<void> {
    const { data } = await apiClient.patch(`/project/sales/rival-estimate/${id}`, params);
    return data;
  }

  async deleteOne(id: RivalEstimateId): Promise<void> {
    const { data } = await apiClient.delete(`/project/sales/rival-estimate/${id}`);
    return data;
  }
}

export const rivalEstimateApi = new RivalEstimateApi();
